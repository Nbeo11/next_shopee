export async function POST(request) {
  const resp = await fetch(
    "http://152.42.240.131/api/v1/signup",
    {},
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  console.log("DATA", JSON.stringify(resp.json()));
  return Response.json({
    message: "Hello World",
  });
}
