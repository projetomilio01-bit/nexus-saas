console.log("Auth carregado");

// LOGIN
const loginForm = document.getElementById("loginForm");
const authMessage = document.getElementById("authMessage");

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    authMessage.textContent = "Entrando...";

    const result = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (result.error) {
      authMessage.textContent = result.error.message;
      return;
    }

    window.location.href = "../index.html";
  });
}

// CADASTRO
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    signupMessage.textContent = "Criando seu acesso...";

    const result = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    console.log("SIGNUP RESULT:", result);

    if (result.error) {
      signupMessage.textContent = result.error.message;
      return;
    }

    const user = result.data.user;

    if (user) {
      const accessExpiresAt = new Date();
      accessExpiresAt.setDate(accessExpiresAt.getDate() + 30);

      const bonusReleaseAt = new Date();
      bonusReleaseAt.setDate(bonusReleaseAt.getDate() + 7);

      const profileResult = await supabaseClient.from("profiles").insert({
        id: user.id,
        email: email,
        access_expires_at: accessExpiresAt.toISOString(),
        bonus_release_at: bonusReleaseAt.toISOString(),
        is_demo: false,
        is_active: true,
      });

      console.log("PROFILE RESULT:", profileResult);

      if (profileResult.error) {
        signupMessage.textContent =
          "Conta criada, mas houve erro ao liberar o acesso.";
        return;
      }
    }

    signupMessage.textContent = "Acesso criado com sucesso!";

    setTimeout(function () {
      window.location.href = "./logm.html";
    }, 1500);
  });
}

// LOGOUT
async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "/pages/logm.html";
}
