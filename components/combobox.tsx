"use client";

import {useEffect, useId, useRef, useState} from "react";

type Option = {value: string; label: string};

export default function Combobox({
  id,
  options,
  value,
  onChange,
  placeholder,
}: {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const selected = options.find((option) => option.value === value) ?? null;
  const [query, setQuery] = useState(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Reset the visible text whenever `value` changes from outside (e.g. the
  // parent clears the selection) — adjusting state during render instead of
  // in an effect avoids an extra render pass.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(selected?.label ?? "");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery(selected?.label ?? "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  const isSearching = query !== (selected?.label ?? "");
  const filtered = isSearching
    ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    if (open) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({block: "nearest"});
    }
  }, [open, highlightedIndex]);

  function selectOption(option: Option) {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey)) {
      if (filtered.length === 0) return;
      event.preventDefault();
      setHighlightedIndex((index) => (index + 1) % filtered.length);
      return;
    }

    if (event.key === "ArrowUp") {
      if (filtered.length === 0) return;
      event.preventDefault();
      setHighlightedIndex((index) => (index - 1 + filtered.length) % filtered.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const option = filtered[highlightedIndex];
      if (option) selectOption(option);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setQuery(selected?.label ?? "");
    }
  }

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${inputId}-listbox`}
        autoComplete="off"
        className="border border-dotted border-muted-foreground p-2 bg-transparent w-full"
        placeholder={placeholder}
        value={query}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setHighlightedIndex(0);
          if (value) onChange("");
        }}
      />
      {open && (
        <ul
          id={`${inputId}-listbox`}
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-dotted border-muted-foreground bg-background"
        >
          {filtered.length === 0 ? (
            <li className="p-2 italic">No matches</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={index === highlightedIndex}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                className={`p-2 cursor-pointer ${
                  index === highlightedIndex ? "bg-accent-fun/75" : "hover:bg-accent-fun/75"
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
