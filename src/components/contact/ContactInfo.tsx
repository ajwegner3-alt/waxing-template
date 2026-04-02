import { clientConfig } from "@/content/client.config";

// Day display labels in order
const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function ContactInfo() {
  const { address, phone, email, hours } = clientConfig;

  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const phoneRaw = phone.replace(/\D/g, "");

  return (
    <div className="space-y-8">

      {/* Phone */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-brand-dark mb-2">
          Call or Text
        </h3>
        <a
          href={`tel:+1${phoneRaw}`}
          className="text-2xl font-bold text-brand-primary hover:text-brand-primary-dark transition-colors"
        >
          {phone}
        </a>
        <p className="text-sm text-brand-dark/50 mt-1">
          Tap to call — we typically respond within a few hours.
        </p>
      </div>

      {/* Email */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-brand-dark mb-2">
          Email
        </h3>
        <a
          href={`mailto:${email}`}
          className="text-brand-primary hover:text-brand-primary-dark transition-colors font-medium"
        >
          {email}
        </a>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-brand-dark mb-2">
          Location
        </h3>
        <address className="not-italic text-brand-dark/70 leading-relaxed">
          {address.street}
          <br />
          {address.city}, {address.state} {address.zip}
        </address>
      </div>

      {/* Map placeholder */}
      <div
        className="rounded-xl border border-brand-dark/10 overflow-hidden bg-brand-light"
        style={{ minHeight: "200px" }}
      >
        <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-center gap-3">
          {/* Map pin icon */}
          <svg
            className="w-8 h-8 text-brand-primary/60"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="text-sm text-brand-dark/60">{fullAddress}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 text-sm font-medium
              text-brand-primary hover:text-brand-primary-dark
              border border-brand-primary/30 hover:border-brand-primary/60
              rounded-full px-4 py-1.5 transition-colors duration-150
            "
          >
            View on Google Maps
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Hours */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-brand-dark mb-3">
          Hours
        </h3>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-brand-dark/5">
            {Object.entries(DAY_LABELS).map(([key, label]) => {
              const hoursValue = hours[key as keyof typeof hours] ?? "Closed";
              const isClosed = hoursValue === "Closed";
              return (
                <tr key={key}>
                  <td className="py-2 pr-4 font-medium text-brand-dark">{label}</td>
                  <td
                    className={`py-2 text-right ${
                      isClosed ? "text-brand-dark/35" : "text-brand-dark/70"
                    }`}
                  >
                    {hoursValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
