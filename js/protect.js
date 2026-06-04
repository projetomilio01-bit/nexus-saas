async function checkAuth() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = "/pages/logm.html";
    return;
  }

  const user = session.user;

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("access_expires_at, is_demo, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    await supabaseClient.auth.signOut();
    window.location.href = "/pages/logm.html";
    return;
  }

  if (profile.is_demo === true) {
    return;
  }

  if (profile.is_active === false) {
    await supabaseClient.auth.signOut();
    window.location.href = "/pages/logm.html";
    return;
  }

  const now = new Date();
  const expiresAt = new Date(profile.access_expires_at);

  if (now > expiresAt) {
    await supabaseClient.auth.signOut();
    window.location.href = "/pages/logm.html";
  }
}

checkAuth();
