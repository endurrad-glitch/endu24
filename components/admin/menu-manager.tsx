'use client'

import { useActionState } from 'react'
import { createMenuItemAction, deleteMenuItemAction, toggleMenuItemAction, type MenuActionState } from '@/actions/menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Database } from '@/types/database'

type MenuItem = Database['public']['Tables']['menu_items']['Row']
const initialState: MenuActionState = {}

export function MenuManager({ menuItems }: { menuItems: MenuItem[] }) {
  const [state, action, pending] = useActionState(createMenuItemAction, initialState)

  return (
    <div className="space-y-6">
      <form action={action} className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-base font-semibold">Create menu item</h3>
        <div className="grid gap-3 md:grid-cols-4">
          <Input name="label" placeholder="Label" required />
          <Input name="url" placeholder="/products" required />
          <Input name="sort_order" type="number" min={0} defaultValue={0} required />
          <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 text-sm text-slate-700">
            <input name="is_active" type="checkbox" defaultChecked /> Active
          </label>
        </div>
        {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
        {state.success ? <p className="mt-2 text-sm text-emerald-600">{state.success}</p> : null}
        <Button type="submit" disabled={pending} className="mt-4">{pending ? 'Saving...' : 'Create'}</Button>
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {menuItems.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">No menu items yet. Create your first navigation link.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{item.label}</td>
                  <td className="px-4 py-3 text-slate-500">{item.url}</td>
                  <td className="px-4 py-3">{item.sort_order}</td>
                  <td className="px-4 py-3">{item.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" onClick={() => toggleMenuItemAction(item.id, item.is_active)}>
                        Toggle
                      </Button>
                      <Button type="button" variant="danger" onClick={() => deleteMenuItemAction(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
