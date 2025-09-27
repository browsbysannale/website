import React, { useEffect, useState } from "react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_EY92b05vcp05fHxDLl7vSr4fMeWJQksV7zCqS7vGmxXrQg/viewform?usp=sharing&ouid=117928404815193535290";
const INSTAGRAM_URL = "https://www.instagram.com/browsbysannale/";

export default function BrowsBySannaLeSite() {
  const [googleReviews, setGoogleReviews] = useState([]);
  const [googleRating, setGoogleRating] = useState(null);
  const [googleUserRatingCount, setGoogleUserRatingCount] = useState(null);

  useEffect(() => {
    const apiKeyFromWindow = typeof window !== "undefined" ? window.__GOOGLE_MAPS_API_KEY__ : undefined;
    const apiKeyFromEnvNext = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : undefined;
    const apiKey = apiKeyFromWindow || apiKeyFromEnvNext;

    if (!apiKey) return;

    const abortController = new AbortController();
    const loadReviews = async () => {
      try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.id,places.rating,places.userRatingCount,places.reviews",
          },
          body: JSON.stringify({ textQuery: "Brows by SannaLe, Leander, TX" }),
          signal: abortController.signal,
        });

        if (!response.ok) return;
        const data = await response.json();
        const place = data?.places?.[0];
        if (!place) return;

        setGoogleRating(place.rating ?? null);
        setGoogleUserRatingCount(place.userRatingCount ?? null);
        const reviews = Array.isArray(place.reviews) ? place.reviews.slice(0, 6) : [];
        setGoogleReviews(reviews);
      } catch (_) {
        // ignore
      }
    };

    loadReviews();
    return () => abortController.abort();
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-gray-800">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/public/images/logo.png" alt="Sanna Le Logo" />

            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm hover:text-rose-600">Services</a>
              <a href="#about" className="text-sm hover:text-rose-600">About</a>
              <a href="#testimonials" className="text-sm hover:text-rose-600">Testimonials</a>
              <a href="#contact" className="text-sm hover:text-rose-600">Contact</a>
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-2xl shadow-sm text-sm font-medium bg-gradient-to-r from-rose-300 to-rose-500 text-white">Book Now</a>
            </div>

            <div className="md:hidden">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 rounded-md bg-rose-300 text-white text-sm font-medium">Book</a>
            </div>
          </nav>
        </div>
      </header>

      <main id="home" className="bg-[linear-gradient(180deg,#fff7f6,transparent)]">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Wake Up with Flawless Brows</h1>
              <p className="mt-4 text-gray-600">Elegant, natural-looking brows tailored to your face. Specializing in eyebrow shaping, tinting, lamination, and microblading in Leander, Texas.</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold shadow-md bg-gradient-to-r from-rose-300 to-rose-500 text-white">Book Your Perfect Brows Now</a>
                <a href="#services" className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium border border-rose-200 text-rose-600">View Services</a>
              </div>

              <ul className="mt-6 text-sm text-gray-500 space-y-2">
                <li>✅ Expert brow shaping & microblading</li>
                <li>✅ Gentle, sanitary procedures</li>
                <li>✅ Warm, welcoming experience</li>
              </ul>

              <div className="sr-only">brow salon in leander texas, eyebrow shaping, microblading near me</div>
            </div>

            <div aria-hidden="false" className="relative w-full rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-0">
                <figure className="w-full h-56 sm:h-72 object-cover">
                  <img src="/public/images/before.jpg" alt="Brows before treatment" className="w-full h-full object-cover" />
                </figure>
                <figure className="w-full h-56 sm:h-72 object-cover">
                  <img src="/public/images/after.jpg" alt="Brows after treatment" className="w-full h-full object-cover" />
                </figure>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/80 px-3 py-1 rounded-full text-xs font-medium">Before — After</div>
            </div>
          </div>
        </section>

        <section id="services" className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Services & Pricing</h2>
            <p className="mt-2 text-gray-600">Personalized care with clear pricing. All bookings via our secure online form.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <article className="p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold">Eyebrow Shaping</h3>
                <p className="text-sm text-gray-600 mt-1">Precision shaping using waxing/threading and expert mapping to suit your face.</p>
                <div className="mt-3 font-bold">$35</div>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium">Book Eyebrow Shaping →</a>
              </article>

              <article className="p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold">Tinting</h3>
                <p className="text-sm text-gray-600 mt-1">Enhance color and definition for a fuller look that lasts up to 6 weeks.</p>
                <div className="mt-3 font-bold">$25</div>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium">Book Tinting →</a>
              </article>

              <article className="p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold">Lamination</h3>
                <p className="text-sm text-gray-600 mt-1">Sculpt and set brows into your desired shape for up to 8 weeks.</p>
                <div className="mt-3 font-bold">$60</div>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium">Book Lamination →</a>
              </article>

              <article className="p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold">Microblading</h3>
                <p className="text-sm text-gray-600 mt-1">Semi-permanent hairstroke technique for natural, fuller brows. Includes 6–8 week touch-up.</p>
                <div className="mt-3 font-bold">$450</div>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium">Book Microblading →</a>
              </article>
            </div>

            <p className="mt-6 text-sm text-gray-500">Note: All appointments are confirmed via email/text. Please check pre-care and aftercare instructions before booking.</p>
          </div>
        </section>

        <section id="testimonials" className="py-10 bg-[url('/images/soft-pattern.png')] bg-contain">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">What Clients Say</h2>
            <p className="mt-2 text-gray-600">Real reviews from Google.</p>

            {(googleRating || googleUserRatingCount) && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-700">
                {googleRating && (
                  <span className="inline-flex items-center gap-1">
                    <span className="text-rose-500">★</span>
                    <span className="font-medium">{Number(googleRating).toFixed(1)}</span>
                  </span>
                )}
                {googleUserRatingCount && (
                  <span className="text-gray-500">({googleUserRatingCount} reviews)</span>
                )}
                <span className="text-gray-400">on Google</span>
              </div>
            )}

            {googleReviews.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {googleReviews.map((review, idx) => (
                  <blockquote key={idx} className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2 text-rose-500 text-sm">
                      {typeof review.rating === "number" && (
                        <span>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating))))}</span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{review.text?.text || review.text || ""}</p>
                    <footer className="mt-3 text-sm text-gray-500">— {review.authorAttribution?.displayName || "Google reviewer"}</footer>
                  </blockquote>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <blockquote className="p-4 rounded-lg bg-white shadow-sm">
                  <p className="text-gray-700">"Sanna shaped my brows perfectly — so gentle and professional. My brows have never looked better!"</p>
                  <footer className="mt-3 text-sm text-gray-500">— Google reviewer</footer>
                </blockquote>
                <blockquote className="p-4 rounded-lg bg-white shadow-sm">
                  <p className="text-gray-700">"Loved my microblading results — natural and long-lasting. Highly recommend."</p>
                  <footer className="mt-3 text-sm text-gray-500">— Google reviewer</footer>
                </blockquote>
              </div>
            )}

            <div className="mt-4">
              <a
                href="https://www.google.com/maps/place/Brows+by+SannaLe/@30.627227,-97.8683274,17z/data=!4m8!3m7!1s0x865b2b5c7b816c8d:0x9962d336485f6b39!8m2!3d30.6272224!4d-97.8657578!9m1!1b1!16s%2Fg%2F11xnq50qrx?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rose-600"
              >
                See more reviews on Google Maps →
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">About Sanna</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="col-span-1">
                <img src="/public/images/artist_sannale.jpeg" alt="Sanna Le — Permanent Makeup Artist" className="w-full rounded-xl shadow-md object-cover h-64" />
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-600">Hi — I’m Sanna, a licensed brow artist based in Leander, TX. I specialize in creating timeless, natural brows through precise shaping, tinting, lamination, and microblading. With X years of experience and a gentle, client-first approach, my goal is to help you feel confident every morning.</p>

                <ul className="mt-4 text-sm text-gray-500 space-y-1">
                  <li>• Licensed & insured</li>
                  <li>• Trained in advanced microblading techniques</li>
                  <li>• Sanitary, single-use tools and medical-grade pigments</li>
                </ul>

                <div className="mt-4">
                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-2xl px-5 py-2 text-sm font-medium bg-rose-100 text-rose-700">Enhance Your Brows Today</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-10 bg-rose-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Contact & Location</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700">Address</p>
                <p className="font-medium">2017 Rosin Jaw Walk, Leander, TX 78641</p>

                <p className="mt-4 text-gray-700">Phone</p>
                <a href="tel:+18322768456" className="font-medium">(832) 276-8456</a>

                <p className="mt-4 text-gray-700">Email</p>
                <a href="mailto:Browsbysannale@gmail.com" className="font-medium">Browsbysannale@gmail.com</a>

                <p className="mt-4 text-gray-700">Social</p>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-2">@browsbysannale</a>
              </div>

              <div>
                <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    title="Brows By Sanna Le location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.889999999999!2d-97.87299999999999!3d30.547999999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b2a5484cec8df%3A0xc9c8968d75aeff8a!2s2017%20Rosin%20Jaw%20Walk%2C%20Leander%2C%20TX%2078641%2C%20USA!5e0!3m2!1sen!2s!4v0000000000000"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="mt-3 text-sm text-gray-500">Parking: Street parking and nearby lots. Please arrive 10 minutes early for first-time visits.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Brows By Sanna Le — Leander, TX</p>
            <div className="flex items-center gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-sm">Instagram</a>
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-sm">Book Now</a>
            </div>
          </div>
        </footer>
      </main>

      <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" aria-label="Book Now" className="fixed bottom-4 right-4 md:hidden inline-flex items-center px-4 py-3 rounded-full shadow-lg bg-rose-400 text-white">Book</a>
    </div>
  );
}
