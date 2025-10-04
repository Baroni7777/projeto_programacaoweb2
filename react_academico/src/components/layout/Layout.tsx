import type { ReactNode } from "react";

type LayoutProps = {
    children?: ReactNode;
}



export default function Layout({children}: LayoutProps) {
    return (
        <div id="defaultLayout">
            <aside>
                <a href="#"> Dashboard</a>
                <a href="#"> Usuario</a>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Sistema Academico
                    </div>
                    <div>
                        Alexandre
                        <a href="#" className="btn-logout"> Logout</a>
                    </div>
                </header> {/* End of header section */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
