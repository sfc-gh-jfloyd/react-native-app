import { snowflakeClient } from "@snowflake/native-apps";
import { getPromptChartBars } from "./getPromptChartBars";

describe("getPromptChartBars", () => {
  it("executes the prompt chart query and cleans the response", async () => {
    const executeQuery = jest.spyOn(snowflakeClient, "executeQuery");
    executeQuery.mockImplementation(() => Promise.resolve({
      cols: [
        {
            "type": "text",
            "name": "JSON"
        },
      ],
      rows: [
        [
          `\`\`\`json
          [
            { "key": "JavaScript", "value": 65 },
            { "key": "Python", "value": 55 },
            { "key": "Java", "value": 45 }
          ]
          \`\`\``
        ]
      ],
    }));
    const bars = await getPromptChartBars("Programming languages by popularity");
    expect(executeQuery).toHaveBeenCalledWith(expect.any(String), "Programming languages by popularity");
    expect(bars).toEqual([
      { "key": "JavaScript", "value": 65 },
      { "key": "Python", "value": 55 },
      { "key": "Java", "value": 45 },
    ])
  });
});
