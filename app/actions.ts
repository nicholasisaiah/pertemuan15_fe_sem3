// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function addStock(formData: FormData) {
  const symbol = formData.get('symbol') as string
  const targetPrice = formData.get('targetPrice')
  const notes = formData.get('notes') as string

  if (!symbol || !targetPrice) return

  await prisma.watchlist.create({
    data: {
      symbol: symbol.toUpperCase(),
      targetPrice: Number(targetPrice),
      notes: notes
    }
  })

  revalidatePath('/') // Refresh halaman otomatis
}

export async function deleteStock(formData: FormData) {
  const id = formData.get('id')

  await prisma.watchlist.delete({
    where: { id: Number(id) }
  })

  revalidatePath('/')
}