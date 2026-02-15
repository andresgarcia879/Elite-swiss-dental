import "@/app/globals.css";

export const metadata = {
    title: "Admin Login",
    description: "Login to the admin dashboard",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
