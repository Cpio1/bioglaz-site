import { company, contacts, faq } from "@/content/site";

/** Структурированные данные строго по содержимому страницы. Без рейтингов и отзывов. */
export function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      email: contacts.email,
      telephone: "+77475902043",
      taxID: company.bin,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KZ",
        addressLocality: "Алматы",
        streetAddress: "проспект Райымбека, 481А, н.п. 2",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
