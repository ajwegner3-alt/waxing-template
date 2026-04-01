// DateTimePicker — no "use client" needed (child of BookingFlow client boundary)
// Static April 2026 mock data. No date library, no new Date() in render.

interface DateTimePickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

// ---------------------------------------------------------------------------
// Static mock data — April 2026, Mon–Thu pattern (~14 dates)
// No dynamic date derivation — safe from hydration mismatch
// ---------------------------------------------------------------------------

const MOCK_AVAILABLE_DATES: string[] = [
  "2026-04-07",
  "2026-04-08",
  "2026-04-09",
  "2026-04-10",
  "2026-04-14",
  "2026-04-15",
  "2026-04-16",
  "2026-04-17",
  "2026-04-21",
  "2026-04-22",
  "2026-04-23",
  "2026-04-24",
  "2026-04-28",
  "2026-04-29",
];

const MOCK_TIME_SLOTS: string[] = [
  "9:00 AM",  "9:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// ---------------------------------------------------------------------------
// Calendar grid builder — native Date, no library
// Returns weeks of 7 cells; null = empty cell, string = "YYYY-MM-DD"
// ---------------------------------------------------------------------------

function buildCalendarGrid(year: number, month: number): (string | null)[][] {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (string | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }),
  ];

  // Chunk into weeks of 7
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

// ---------------------------------------------------------------------------
// Format a "YYYY-MM-DD" string to a readable label — no Date needed for display
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dayOfWeek = new Date(year, month - 1, day).getDay();
  return `${DAY_NAMES[dayOfWeek]}, ${MONTH_NAMES[month - 1]} ${day}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

// April 2026 = month index 3
const CALENDAR_YEAR = 2026;
const CALENDAR_MONTH = 3;
const CALENDAR_WEEKS = buildCalendarGrid(CALENDAR_YEAR, CALENDAR_MONTH);

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimePickerProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-brand-dark">
          Pick a date &amp; time
        </h2>
        <p className="text-brand-dark/60 mt-1">
          Available appointments for April 2026. Times shown in Central Time.
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-brand-dark/10 p-5 shadow-sm">
        {/* Month header */}
        <div className="text-center mb-4">
          <p className="font-semibold text-brand-dark">April 2026</p>
        </div>

        {/* Day-of-week labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="text-center text-xs font-medium text-brand-dark/40 py-1"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="space-y-1">
          {CALENDAR_WEEKS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((dateStr, di) => {
                if (!dateStr) {
                  return <div key={di} aria-hidden="true" />;
                }

                const isAvailable = MOCK_AVAILABLE_DATES.includes(dateStr);
                const isSelected = dateStr === selectedDate;
                const dayNum = parseInt(dateStr.split("-")[2], 10);

                return (
                  <button
                    key={di}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => isAvailable && onSelectDate(dateStr)}
                    aria-label={`${formatDateLabel(dateStr)}${isAvailable ? "" : " — unavailable"}`}
                    aria-pressed={isSelected}
                    className={[
                      "w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-150",
                      isSelected
                        ? "bg-brand-primary text-white"
                        : isAvailable
                          ? "bg-white text-brand-dark hover:bg-brand-primary/10 border border-brand-dark/10"
                          : "text-brand-dark/20 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Time slots — only visible after a date is selected */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold text-brand-dark mb-1">
            Available times
          </h3>
          <p className="text-sm text-brand-dark/50 mb-3">
            {formatDateLabel(selectedDate)}
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {MOCK_TIME_SLOTS.map((slot) => {
              const isSelected = slot === selectedTime;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectTime(slot)}
                  aria-pressed={isSelected}
                  className={[
                    "py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors duration-150",
                    isSelected
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-brand-dark border-brand-dark/10 hover:border-brand-primary hover:bg-brand-primary/5",
                  ].join(" ")}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
