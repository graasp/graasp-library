export const dynamic = 'force-dynamic'; // defaults to force-static

export async function GET() {
  return new Response(
    JSON.stringify({
      // eslint-disable-next-line
      // @ts-ignore
      coverage: global.__coverage__ || null,
    }),
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    },
  );
}
