async function checkBonusAccess() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("bonus_release_at, is_demo, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile) return;

  if (profile.is_demo === true) return;

  const now = new Date();
  const releaseDate = new Date(profile.bonus_release_at);

  if (now >= releaseDate) return;

  const diffTime = releaseDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const overlay = document.createElement("div");
  overlay.innerHTML = `
  <div class="bonus-lock-overlay">
    <div class="bonus-lock-card">
      <div class="bonus-lock-icon">🔒</div>

      <h2>Biblioteca Premium bloqueada</h2>

      <p>Esse bônus será liberado em:</p>

      <strong>${diffDays} dias</strong>

      <span>Enquanto isso, avance pelo Mapa do Iniciante™.</span>

      <a href="../index.html" class="bonus-lock-back">
        Voltar para Meu Mapa
      </a>
    </div>
  </div>
`;

  document.body.appendChild(overlay);
}

checkBonusAccess();
