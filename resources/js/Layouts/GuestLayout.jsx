import { Head } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div>
      <Head>
        <link
          rel="icon"
          href="/assets/logo/logo.svg"
          type="image/svg+xml"
        />
      </Head>
      {children}
    </div>
  );
}
