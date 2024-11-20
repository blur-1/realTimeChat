import { act, renderHook } from "@testing-library/react";
import useChat from "../hooks/useChat";

interface WebSocketEvent {
  data: string; 
}

interface WebSocketMock {
  readyState: number;
  send: jest.Mock;
  close: jest.Mock;
  addEventListener: (type: string, listener: (event: WebSocketEvent) => void) => void;
  removeEventListener: (type: string) => void;
  triggerEvent: (type: string, event: WebSocketEvent) => void;
}

class WebSocketMockImpl implements WebSocketMock {
  static OPEN = 1;
  readyState = WebSocketMockImpl.OPEN;
  send = jest.fn();
  close = jest.fn();
  private events: Record<string, (event: WebSocketEvent) => void> = {};

  addEventListener(type: string, listener: (event: WebSocketEvent) => void): void {
    this.events[type] = listener;
  }

  removeEventListener(type: string): void {
    delete this.events[type];
  }

  triggerEvent(type: string, event: WebSocketEvent): void {
    if (this.events[type]) {
      this.events[type](event);
    }
  }
}

describe("useChat", () => {
  let originalWebSocket: typeof WebSocket;

  beforeAll(() => {
    originalWebSocket = global.WebSocket;
    global.WebSocket = WebSocketMockImpl as unknown as typeof WebSocket;
  });

  afterAll(() => {
    global.WebSocket = originalWebSocket;
  });

  it("should receive messages through WebSocket", () => {
    const { result } = renderHook(() => useChat("TestUser"));

    act(() => {
      const mockSocket = result.current.socket.current as unknown as WebSocketMockImpl;
      mockSocket.triggerEvent("message", {
        data: JSON.stringify({
          id: 1,
          text: "Hello World",
          sender: "AnotherUser",
        }),
      });
    });

    expect(result.current.messages).toEqual([
      { id: 1, text: "Hello World", sender: "AnotherUser" },
    ]);
  });

  it("should send messages through WebSocket", () => {
    const { result } = renderHook(() => useChat("TestUser"));

    act(() => {
      result.current.sendMessage("Test message");
    });

    const mockSocket = global.WebSocket as unknown as WebSocketMockImpl;
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        id: expect.any(Number),
        text: "Test message",
        sender: "TestUser",
      })
    );
  });
});
