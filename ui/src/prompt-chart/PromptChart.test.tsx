import { render, screen } from "@testing-library/react";
import * as PromptChartBars from "./getPromptChartBars";
import { PromptChart } from "./PromptChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PromptChart", () => {
  it("displays a chart for the given prompt", async () => {
    const getPromptChartBars = jest.spyOn(PromptChartBars, "getPromptChartBars");
    getPromptChartBars.mockImplementation(() => Promise.resolve([
      { "key": "JavaScript", "value": 65 },
      { "key": "Python", "value": 55 },
      { "key": "Java", "value": 45 },
    ]));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <PromptChart prompt="Programming languages by popularity"/>
      </QueryClientProvider>
    );
    expect(getPromptChartBars).toHaveBeenCalledWith("Programming languages by popularity");

    screen.getAllByText("l");
    screen.getAllByText("o");
    screen.getAllByText("a");
    screen.getAllByText("d");
    screen.getAllByText("i");
    screen.getAllByText("n");
    screen.getAllByText("g");

    await screen.findByText("JavaScript");
    await screen.findByText("Python");
    await screen.findByText("Java");
  });
});
