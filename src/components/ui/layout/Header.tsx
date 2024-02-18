import CustomDropDown from "@/lib/CustomDropDown";
import { useAuth, useDecodedAuth } from "@/context/AuthContext";
import { HiOutlineLogout } from "react-icons/hi";
import cookie from 'js-cookie'

export default function Header() {

  const { fullname, email } = useDecodedAuth()
  const { setAccessToken } = useAuth()

  const handleLogout = () => {
    cookie.remove('access_token');
    setAccessToken(null)
  }

  return (
    <header className="p-3 flex justify-between items-center rounded-md bg-foregroundSecondary border">
      <div className=""></div>

      <div className="bg-gray-300 p-1 rounded-full">
        <CustomDropDown
          trigger={<img src="/profile.png" alt="avatar" className="max-w-10 aspect-square cursor-pointer" />}
          header={
            <div className="flex flex-col">
              <h2>{fullname}</h2>
              <p className="font-normal text-muted-foreground">{email}</p>
            </div>
          }
          menuItems={[
            {
              type: "button",
              element: <span className="hover:cursor-pointer">Profile</span>
            },
            {
              type: "button",
              element: <span className="hover:cursor-pointer">Dashboard</span>
            },
            {
              type: "button",
              element: <button onClick={() => handleLogout()} className="flex w-full text-red-500 items-center gap-2">
                <HiOutlineLogout />
                Logout
              </button>
            },

          ]}
        />
      </div>

    </header>
  )
}
