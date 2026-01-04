'use client'

import { useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore'

export default function VisitorTracker() {
  useEffect(() => {
    const updateStats = async () => {
      // Mencegah hit ganda dalam satu sesi
      const hasVisited = sessionStorage.getItem('hasVisited')
      if (hasVisited) return

      // Dapatkan tanggal hari ini (Format: YYYY-MM-DD)
      const today = new Date().toLocaleDateString('en-CA'); // en-CA menghasilkan YYYY-MM-DD

      try {
        // 1. Update TOTAL VISITOR
        const totalRef = doc(db, "stats", "total_counter")
        const totalSnap = await getDoc(totalRef)
        
        if (totalSnap.exists()) {
          await updateDoc(totalRef, { count: increment(1) })
        } else {
          await setDoc(totalRef, { count: 1 })
        }

        // 2. Update DAILY VISITOR (Berdasarkan Tanggal)
        const dailyRef = doc(db, "stats", "daily_stats", "days", today)
        const dailySnap = await getDoc(dailyRef)

        if (dailySnap.exists()) {
          await updateDoc(dailyRef, { count: increment(1) })
        } else {
          await setDoc(dailyRef, { count: 1 })
        }

        sessionStorage.setItem('hasVisited', 'true')
      } catch (error) {
        console.error("Gagal update statistik:", error)
      }
    }

    updateStats()
  }, [])

  return null
}