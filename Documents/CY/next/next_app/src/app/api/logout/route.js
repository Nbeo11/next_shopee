export async function POST(token) {
  if (!token) return null;
  try {
    const res = await $fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
