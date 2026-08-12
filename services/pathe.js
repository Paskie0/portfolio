export const getCinemas = async () => {
  const response = await fetch("/api/pathe/cinemas");

  if (!response.ok) {
    throw new Error("Failed to fetch cinemas");
  }

  return response.json();
};

export const getShows = async () => {
  const response = await fetch("/api/pathe/shows");

  if (!response.ok) {
    throw new Error("Failed to fetch shows");
  }

  return response.json();
};

export const getAvailability = async (movieSlug) => {
  const response = await fetch(`/api/pathe/availability?movieSlug=${encodeURIComponent(movieSlug)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch availability");
  }

  return response.json();
};

export const getWatches = async () => {
  const response = await fetch("/api/watches");

  if (!response.ok) {
    throw new Error("Failed to fetch watches");
  }

  return response.json();
};

export const createWatch = async (watch) => {
  const response = await fetch("/api/watches", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(watch),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create watch");
  }

  return data;
};

export const deleteWatch = async (id) => {
  const response = await fetch(`/api/watches/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete watch");
  }
};
