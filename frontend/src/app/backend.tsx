export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number;
}

export async function apiGetExpenses(month: string): Promise<IExpense[]> {
  const res = await fetch(
    `http://localhost:3001/despesas?mes=${month}&_sort=dia`
  );
  return res.json();
}
