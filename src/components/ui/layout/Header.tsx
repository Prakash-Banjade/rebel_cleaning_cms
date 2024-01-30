
export default function Header() {
  return (
    <header className="p-3 flex justify-between items-center rounded-md bg-foregroundSecondary border">
        <div className=""></div>

        <div className="bg-gray-300 p-1 rounded-full">
            <img src="/profile.png" alt="avatar" className="max-w-10 aspect-square" />
        </div>

    </header>
  )
}
