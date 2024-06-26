import { ActiveLink } from "./ActiveLink";

const navItems = [
  { path: 'course', text: 'Courses' },
  { path: 'student', text: 'Students' },
  { path: 'inscription', text: 'Inscriptions' },
]

export default function Nav() {
  return (
    <nav className="bg-black w-full z-10 top-0 shadow flex justify-between items-center">
      <div>
        <h1 className="font-bold text-white pl-5">Course Management System</h1>
      </div>
      <div className="px-4 bg-black">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {
                navItems.map(navItem => (
                  <ActiveLink key={navItem.path} {...navItem} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}