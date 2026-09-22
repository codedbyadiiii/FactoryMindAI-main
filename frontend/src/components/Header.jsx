import { Factory } from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="logo">

        <Factory size={42} color="#3b82f6" />

        <div>
          <h1>FactoryMind AI</h1>

          <p>
            AI-Powered Industrial Knowledge Assistant
          </p>
        </div>

      </div>

    </header>
  );
}

export default Header;