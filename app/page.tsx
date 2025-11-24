// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>To get started, edit the page.tsx file.</h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
// app/page.tsx
import { PrismaClient, Watchlist } from '@prisma/client' // <--- UPDATE IMPORT INI
import { addStock, deleteStock } from './actions'

const prisma = new PrismaClient()

async function getWatchlist() {
  const data = await prisma.watchlist.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return data
}

export default async function Home() {
  const stocks = await getWatchlist()

  return (
    <div className="container">
      <h1>📈 Trading Watchlist</h1>

      {/* ... bagian FORM tetap sama ... */}
      <div className="card">
        <form action={addStock}>
          <div className="input-group">
            <input type="text" name="symbol" placeholder="Kode Aset (ex: BBCA, BTC)" required />
          </div>
          <div className="input-group">
            <input type="number" name="targetPrice" placeholder="Target Harga Beli" required />
          </div>
          <div className="input-group">
            <input type="text" name="notes" placeholder="Catatan (ex: Tunggu support)" />
          </div>
          <button type="submit" className="add-btn">+ Tambah Pantauan</button>
        </form>
      </div>

      {/* ... bagian LIST diperjelas tipe datanya ... */}
      <div className="card">
        {stocks.length === 0 ? (
          <p style={{textAlign: 'center', color: '#888'}}>Belum ada aset dipantau.</p>
        ) : (
          // Tambahkan tipe : Watchlist di sini agar TypeScript tidak bingung
          stocks.map((stock: Watchlist) => (
            <div key={stock.id} className="stock-item">
              <div className="stock-info">
                <span className="symbol">{stock.symbol}</span>
                <span className="price">Target: {stock.targetPrice} | Note: {stock.notes || '-'}</span>
              </div>
              <form action={deleteStock}>
                <input type="hidden" name="id" value={stock.id} />
                <button type="submit" className="delete-btn">X</button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  )
}