import { Request, Response } from "express";
import { getRequestMessages } from "../src/controllers/requestMessages";
import { RequestMessage } from "../src/interfaces/requestMessage.interface";
import RequestMessagesModel from "../src/models/requestMessages";
import { getMessageFromRequest } from "../src/services/requestMessages";

const handleHttp = jest.fn();
describe("getRequestMessages", () => {
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve and return messages for a given request ID", async () => {
    // Arrange
    const req = { params: { id: "123" } } as Request<any>;

    const expectedResponse: RequestMessage[] = [
      {
        request_id: "123",
        description: "message 1",
        senderName: "John",
        senderLastName: "Doe",
      },
      {
        request_id: "123",
        description: "message 2",
        senderName: "Jane",
        senderLastName: "Doe",
      },
    ];
    jest
      .spyOn(RequestMessagesModel, "find")
      .mockResolvedValueOnce(expectedResponse);

    // Act
    await getRequestMessages(req, mockResponse);

    // Assert
    expect(RequestMessagesModel.find).toHaveBeenCalledWith({
      request_id: "123",
    });
    expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
  });

  it("should handle errors and return a default error response", async () => {
    // Arrange
    const req = { params: { id: "123" } } as Request<any>;
    const expectedErrorMessage = "ERROR_GET_MESSAGES";

    jest
      .spyOn(RequestMessagesModel, "find")
      .mockRejectedValueOnce(new Error("Test error"));

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Act
    await getRequestMessages(req, mockResponse);

    // Assert
    expect(RequestMessagesModel.find).toHaveBeenCalledWith({
      request_id: "123",
    });

    expect(mockResponse.send).toHaveBeenCalledWith({
      error: expectedErrorMessage,
    });
  });
});

describe("getMessageFromRequest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve messages for a given request ID", async () => {
    // Arrange
    const expectedResponse = [
      {
        description: "Test message",
        request_id: "123",
        senderName: "John",
        senderLastName: "Doe",
      },
    ];
    jest
      .spyOn(RequestMessagesModel, "find")
      .mockResolvedValueOnce(expectedResponse);

    // Act
    const response = await getMessageFromRequest("123");

    // Assert
    expect(RequestMessagesModel.find).toHaveBeenCalledWith({
      request_id: "123",
    });
    expect(response).toEqual(expectedResponse);
  });

  it("should handle errors and return a default error response", async () => {
    // Arrange
    const expectedErrorMessage = "ERROR_GET_MESSAGES";
    jest
      .spyOn(RequestMessagesModel, "find")
      .mockRejectedValueOnce(new Error(expectedErrorMessage));

    // Act
    const response = await getMessageFromRequest("123");

    // Assert
    expect(RequestMessagesModel.find).toHaveBeenCalledWith({
      request_id: "123",
    });
    expect(response).toEqual({ error: expectedErrorMessage });
  });
});
