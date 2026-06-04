const SUPABASE_URL = "https://gkddjojppqtwidqmugxc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZGRqb2pwcHF0d2lkcW11Z3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNzM3NTYsImV4cCI6MjA5NTg0OTc1Nn0.izpB1PNcBvS0unWNR4N4qodgmNF92n-vCINeo9AooI4";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase conectado:", SUPABASE_URL);
