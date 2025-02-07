import { redirect } from "next/navigation";

export default function Home() {
    redirect("/products"); // Automatically redirects to /products
    return null; // No need to render anything
}
