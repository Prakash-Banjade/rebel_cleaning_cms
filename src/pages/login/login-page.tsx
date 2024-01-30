import { LoginForm } from "@/components/page-components/login/login-form";

export default function LoginPage() {
    return (
        <div className="grid place-items-center min-h-[100dvh] bg-[url('/sofa.webp')] bg-cover bg-no-repeat">
            <div className="w-[600px] px-20 py-12 rounded-md border shadow-sm bg-white">
                <div className="flex flex-col items-center justify-center mb-12 prose lg:prose-lg">
                    <img src="/logo.png" alt="Rebel_Cleaning_Logo" className="w-20 !mb-5" />
                    <h2 className="!mt-0">Sign in to Rebel Cleaning</h2>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
