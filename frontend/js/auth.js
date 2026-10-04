const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("formMessage");

async function submitAuth(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

if (loginForm) loginForm.addEventListener("submit", async e => {
  e.preventDefault(); message.textContent = "";
  try {
    const data = await submitAuth("/api/auth/login", { email: email.value, password: password.value });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    location.href = new URLSearchParams(location.search).get("next") || "/";
  } catch (err) { message.textContent = err.message; }
});

if (registerForm) registerForm.addEventListener("submit", async e => {
  e.preventDefault(); message.textContent = "";
  try {
    const data = await submitAuth("/api/auth/register", { name: name.value, email: email.value, password: password.value });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    location.href = "/";
  } catch (err) { message.textContent = err.message; }
});
