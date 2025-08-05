export async function fetchProjects() {
const res = await fetch('http://127.0.0.1:1337/api/projets?populate=*', {
  cache: 'no-store',
});

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des projets');
  }

  const data = await res.json();
  return data.data;
}
