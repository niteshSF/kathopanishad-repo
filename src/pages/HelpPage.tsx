import Header from "@/components/shared/Header"
import BaseLayout from "@/layouts/BaseLayout"

export default function HelpPage() {
  return (
    <BaseLayout>
      <Header />
      <h1 className="mt-10 text-center font-bold text-4xl pb-4 text-darkorange underline capitalize">
        Help
      </h1>
      <h2 className="font-bold text-xl text-darkbrown mb-6 text-center">
        Coming soon...
      </h2>
    </BaseLayout>
  )
}
