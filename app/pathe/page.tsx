"use client";

import {useEffect, useMemo, useState} from "react";
import {format, parse} from "date-fns";
import {CalendarIcon, ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Combobox from "@/components/combobox";
import {getCinemas, getShows, getAvailability, getWatches, createWatch, deleteWatch} from "@/services/pathe";

type Cinema = {slug: string; name: string; citySlug: string};
type Show = {slug: string; title: string; posterPath?: {lg?: string; md?: string}};
type Watch = {
  id: string;
  cinemaSlug: string;
  cinemaName: string;
  movieSlug: string;
  movieTitle: string;
  targetDate: string;
  ntfyTopic: string;
};
type Availability = Record<string, {days?: Record<string, unknown>}>;

const DATE_FORMAT = "yyyy-MM-dd";

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
tomorrowDate.setHours(0, 0, 0, 0);

export default function PathePage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  const [cinemaSlug, setCinemaSlug] = useState("");
  const [movieSlug, setMovieSlug] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [ntfyTopic, setNtfyTopic] = useState("");

  const [availability, setAvailability] = useState<Availability | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    Promise.all([getCinemas(), getShows()])
      .then(([cinemasData, showsData]) => {
        setCinemas(cinemasData);
        setShows(showsData.sort((a: Show, b: Show) => a.title.localeCompare(b.title)));
      })
      .catch(() => setError("Failed to load Pathé data"))
      .finally(() => setLoading(false));

    getWatches()
      .then(setWatches)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!movieSlug) {
      setAvailability(null);
      return;
    }
    getAvailability(movieSlug)
      .then(setAvailability)
      .catch(() => setAvailability(null));
  }, [movieSlug]);

  const showOptions = useMemo(
    () => shows.map((show) => ({value: show.slug, label: show.title})),
    [shows]
  );

  const alreadyPlayingDates = useMemo(() => {
    if (!availability || !cinemaSlug) return [];
    return Object.keys(availability[cinemaSlug]?.days ?? {}).sort();
  }, [availability, cinemaSlug]);

  const dateAlreadyPlaying = targetDate && alreadyPlayingDates.includes(targetDate);
  const alreadyPlayingDateObjects = useMemo(
    () => alreadyPlayingDates.map((date) => parse(date, DATE_FORMAT, new Date())),
    [alreadyPlayingDates]
  );
  const selectedDate = targetDate ? parse(targetDate, DATE_FORMAT, new Date()) : undefined;

  const selectedCinema = cinemas.find((c) => c.slug === cinemaSlug);
  const selectedShow = shows.find((s) => s.slug === movieSlug);

  const canSubmit =
    cinemaSlug && movieSlug && targetDate && ntfyTopic && !dateAlreadyPlaying && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCinema || !selectedShow) return;

    setSubmitting(true);
    setError("");
    try {
      const watch = await createWatch({
        cinemaSlug: selectedCinema.slug,
        cinemaName: selectedCinema.name,
        movieSlug: selectedShow.slug,
        movieTitle: selectedShow.title,
        targetDate,
        ntfyTopic,
      });
      setWatches((prev) => [...prev, watch]);
      setTargetDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create watch");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(id: string) {
    await deleteWatch(id);
    setWatches((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <main className="w-full max-w-5xl justify-items-center mx-auto grid gap-8 px-4 sm:px-8 py-8">
      <div className="grid">
        <span className="text-4xl text-center">Pathé Watcher</span>
        <span className="italic text-center">Get notified when tickets go live for a movie that isn&apos;t scheduled yet</span>
      </div>

      {loading ? (
        <span>Loading Pathé data...</span>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 w-full max-w-md min-w-0">
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-bold">Cinema</span>
            <div className="relative w-full min-w-0">
              <select
                className="appearance-none border border-dotted border-muted-foreground p-2 pr-8 bg-transparent w-full min-w-0"
                value={cinemaSlug}
                onChange={(e) => setCinemaSlug(e.target.value)}
              >
                <option value="">Select a cinema</option>
                {cinemas.map((cinema) => (
                  <option key={cinema.slug} value={cinema.slug}>
                    {cinema.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </label>

          <div className="grid gap-1 min-w-0">
            <label htmlFor="movie-combobox" className="text-sm font-bold">
              Movie
            </label>
            <Combobox
              id="movie-combobox"
              options={showOptions}
              value={movieSlug}
              onChange={setMovieSlug}
              placeholder="Search movies..."
            />
          </div>

          {cinemaSlug && movieSlug && (
            <div className="text-sm italic">
              {alreadyPlayingDates.length > 0 ? (
                <>
                  <span>Already showing at {selectedCinema?.name} on:</span>
                  <ul className="columns-2 list-disc pl-5 marker:text-muted-foreground">
                    {alreadyPlayingDates.map((date) => (
                      <li key={date}>{format(parse(date, DATE_FORMAT, new Date()), "dd-MM-yyyy")}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <span>Not currently scheduled at {selectedCinema?.name}</span>
              )}
            </div>
          )}

          <div className="grid gap-1 min-w-0">
            <label htmlFor="date-picker-trigger" className="text-sm font-bold">
              Date to watch for
            </label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker-trigger"
                  type="button"
                  variant="outline"
                  className="relative w-full min-w-0 justify-start rounded-none h-10.5 p-2 pr-8 text-base font-normal border border-dotted border-muted-foreground bg-transparent text-foreground shadow-none hover:bg-transparent hover:text-foreground dark:bg-transparent dark:border-muted-foreground dark:hover:bg-transparent"
                >
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  <CalendarIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  defaultMonth={selectedDate ?? tomorrowDate}
                  disabled={[{before: tomorrowDate}, ...alreadyPlayingDateObjects]}
                  onSelect={(date) => {
                    if (!date) return;
                    setTargetDate(format(date, DATE_FORMAT));
                    setDatePickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {dateAlreadyPlaying && (
              <span className="text-sm text-destructive">
                That date is already showing at this cinema — no need to watch for it.
              </span>
            )}
          </div>

          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-bold">ntfy.sh topic</span>
            <input
              type="text"
              placeholder="your-ntfy-topic"
              className="border border-dotted border-muted-foreground p-2 bg-transparent w-full min-w-0"
              value={ntfyTopic}
              onChange={(e) => setNtfyTopic(e.target.value)}
            />
          </label>

          {error && <span className="text-sm text-destructive">{error}</span>}

          <Button type="submit" disabled={!canSubmit} variant="outline" className="rounded-none border-dotted">
            {submitting ? "Setting up watch..." : "Notify me when tickets go live"}
          </Button>
        </form>
      )}

      <div className="grid gap-2">
        <div className="grid gap-0">
          <span className="text-xl text-accent-fun font-bold">Your active watches</span>
          <span className="text-sm italic text-muted-foreground">Checks every 15 minutes</span>
        </div>
        {watches.length === 0 ? (
          <span className="italic">No active watches yet</span>
        ) : (
          <div className="flex flex-col gap-2">
            {watches.map((watch) => (
              <div
                key={watch.id}
                className="flex items-center justify-between gap-4 border border-dotted border-muted-foreground p-2"
              >
                <div className="grid min-w-0">
                  <span className="font-extrabold truncate">{watch.movieTitle}</span>
                  <span className="truncate">
                    {watch.cinemaName} — {format(parse(watch.targetDate, DATE_FORMAT, new Date()), "dd-MM-yyyy")}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-none border-dotted"
                  onClick={() => handleCancel(watch.id)}
                >
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
