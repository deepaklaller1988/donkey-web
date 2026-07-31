// import type { Metadata } from "next";
// import "./globals.css";
// import MainLayout from "@components/core/MainLayout";
// import Provider from "@components/core/Provider";
// import ScriptLoader from "@components/ScriptLoader";
// import ToastProvider from "@components/core/ToasterProvider";
// import Script from "next/script";

// export const metadata: Metadata = {
//   title: "Donkey | Watch Free Movies Online",
//   description:
//     "Donkey – the ultimate destination for global entertainment! Watch HD Movies & TV Shows online for Free!",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <html lang="en">
//       <head>
//         <meta
//           name="galaksion-domain-verification"
//           content="9c215d0ab770acaa88d7a0fbaadb53947827230566f709ea392f337b98b30058"
//         />
//         <Script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-7QQKB1XSQF"
//         />
//         <Script id="google-analytics">
//           {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-7QQKB1XSQF');
//           `}
//         </Script>
//       </head>
//       <body>
//         <Provider>
//           <ScriptLoader
//             excludedPaths={["/watch-now", "/profile"]}
//             excludedButtonIds={["login-button","search-id","form-button","profile-button"]}
//           >
//             <MainLayout>{children}</MainLayout>
//           </ScriptLoader>
//           <ToastProvider />
//         </Provider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@components/core/MainLayout";
import Provider from "@components/core/Provider";
import ScriptLoader from "@components/ScriptLoader";
import ToastProvider from "@components/core/ToasterProvider";
import Script from "next/script";
import AdScript from "@components/core/AdSrcipt";

export const metadata: Metadata = {
  title: "Donkey | Watch Free Movies Online",
  description:
    "Donkey – the ultimate destination for global entertainment! Watch HD Movies & TV Shows online for Free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <meta
          name="galaksion-domain-verification"
          content="9c215d0ab770acaa88d7a0fbaadb53947827230566f709ea392f337b98b30058"
        /> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7QQKB1XSQF"
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7QQKB1XSQF');
          `}
        </Script>
      </head>
      <body>
        <Provider>
          {/* <ScriptLoader
            excludedPaths={["/watch-now", "/profile"]}
            excludedButtonIds={["login-button", "search-id", "form-button", "profile-button"]}
          > */}
            <MainLayout>{children}</MainLayout>

          {/* </ScriptLoader> */}
          {/* <AdScript /> */}
          <ToastProvider />
        </Provider>
        <Script id="clever-core" strategy="afterInteractive">
          {`
            (function (document, window) {
              var a,
                c = document.createElement("script"),
                f = window.frameElement;

              c.id = "CleverCoreLoader105698";
              c.src =
                "https://scripts.cleverwebserver.com/7eb7d7bd8fabd6944b4b5fb98c56c2a0.js";

              c.async = true;
              c.type = "text/javascript";
              c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
              c.setAttribute("data-callback", "put-your-callback-function-here");
              c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
              c.setAttribute("data-callback-url-view", "put-your-view-macro-here");

              try {
                a =
                  parent.document.getElementsByTagName("script")[0] ||
                  document.getElementsByTagName("script")[0];
              } catch (e) {
                a = false;
              }

              a ||
                (a =
                  document.getElementsByTagName("head")[0] ||
                  document.getElementsByTagName("body")[0]);

              a.parentNode.insertBefore(c, a);
            })(document, window);
          `}
        </Script>
      </body>
    </html>
  );
}

