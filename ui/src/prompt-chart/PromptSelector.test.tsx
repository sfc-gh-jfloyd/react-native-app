import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PromptSelector } from "./PromptSelector";

describe("PromptSelector", () => {
  it("selects a prompt for a child component", async () => {
    const children = jest.fn();
    render(<PromptSelector children={children}/>);
    const defaultValue = "Programming languages by popularity";
    expect(children).toHaveBeenCalledWith(defaultValue);
    const textInput = screen.getByDisplayValue(defaultValue);
    const submitButton = screen.getByRole("button");
    await userEvent.clear(textInput);
    await userEvent.type(textInput, "test prompt");
    await userEvent.click(submitButton);
    expect(children).toHaveBeenLastCalledWith("test prompt");
  });
});
