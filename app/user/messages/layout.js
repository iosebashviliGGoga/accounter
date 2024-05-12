

export const metadata = {
  title: "Accounter - შეტყობინებები",
  description: "Accounter",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="messages">
            {children}
      </div>
    </>
  )
}