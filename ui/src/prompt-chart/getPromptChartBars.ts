import { snowflakeClient } from "@snowflake/native-apps";

const cleanResponse = (response: string) => response.replace('```json', '').replace('```', '')

export interface Bar {
  key: string;
  value: number;
}

export const getPromptChartBars = async (prompt: string): Promise<Bar[]> => {
  const result = await snowflakeClient.executeQuery(`
    SELECT 
      SNOWFLAKE.CORTEX.COMPLETE(
          'mistral-large2',
          CONCAT(
              'Respond with only a json array of objects with a structure { key: string, value: number } which each represent a bar in a bar chart.',
              'Make the json satisfy the following criteria:',
              ?
          )
        ) AS JSON
  `, prompt);
  const parsedResult = result ? JSON.parse(cleanResponse(result.rows[0][0])) : null;

  if (parsedResult === null || !Array.isArray(parsedResult) || parsedResult.some(v => v.key === undefined || v.value === undefined)) {
    console.error("Invalid response from query", parsedResult);
    return Promise.resolve([]);
  }


  return parsedResult;
};
