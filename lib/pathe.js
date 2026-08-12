const BASE_URL = "https://www.pathe.nl/api";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

async function patheFetch(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
      Referer: "https://www.pathe.nl/",
    },
  });

  if (!response.ok) {
    throw new Error(`Pathé API error: ${response.status}`);
  }

  return response.json();
}

export async function getCinemas() {
  const cinemas = await patheFetch("/cinemas?language=nl");
  return cinemas.map((cinema) => ({
    slug: cinema.slug,
    name: cinema.name,
    citySlug: cinema.citySlug,
  }));
}

export async function getShows() {
  const {shows} = await patheFetch("/shows?language=nl");
  return shows.map((show) => ({
    slug: show.slug,
    title: show.title,
    posterPath: show.posterPath,
  }));
}

export async function getMovieCinemaDays(movieSlug) {
  return patheFetch(`/show/${movieSlug}/cinemas?language=nl`);
}
