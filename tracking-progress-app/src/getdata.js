// netlify/functions/get-data.js
import { neon } from '@netlify/neon';

export const handler = async (event, context) => {
  try {
    const sql = neon(); // Server can see the env
    const data = await sql`SELECT * FROM test_table`; // Use your table name
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};