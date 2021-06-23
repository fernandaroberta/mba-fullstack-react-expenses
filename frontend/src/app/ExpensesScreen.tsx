import {
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiGetExpenses, IExpense } from "./backend";
import { currentMonth, currentYear } from "./helper";

export default function ExpensesScreen() {
  const history = useHistory();
  const { month } = useParams<{ month: string }>();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);

  function getExpenses(period: string) {
    history.push(`/expenses/${period}`);
  }

  useEffect(() => {
    async function getExpenses() {
      const res = await apiGetExpenses(month);
      setExpenses(res);
    }
    getExpenses();
  }, [month]);

  useEffect(() => {
    const period = `${selectedYear}-${selectedMonth}`;
    getExpenses(period);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setTotalExpense(expenses.reduce((e, curr) => e + curr.valor, 0));
  }, [expenses]);

  function handleYearChange(event: React.ChangeEvent<any>) {
    setSelectedYear(event.target.value);
  }

  function handleMonthChange(event: React.ChangeEvent<any>) {
    setSelectedMonth(event.target.value);
  }

  return (
    <>
      <header>
        <Grid container spacing={4} justify="center" alignItems="center">
          <Grid item xs={1}>
            <InputLabel id="yearLabel">Ano</InputLabel>
            <Select
              labelId="yearLabel"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={1}>
            <InputLabel id="monthLabel">Mês</InputLabel>
            <Select
              labelId="monthLabel"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <MenuItem value={"01"}>Janeiro</MenuItem>
              <MenuItem value={"02"}>Fevereiro</MenuItem>
              <MenuItem value={"03"}>Março</MenuItem>
              <MenuItem value={"04"}>Abril</MenuItem>
              <MenuItem value={"05"}>Maio</MenuItem>
              <MenuItem value={"06"}>Junho</MenuItem>
              <MenuItem value={"07"}>Julho</MenuItem>
              <MenuItem value={"08"}>Agosto</MenuItem>
              <MenuItem value={"09"}>Setembro</MenuItem>
              <MenuItem value={"10"}>Outubro</MenuItem>
              <MenuItem value={"11"}>Novembro</MenuItem>
              <MenuItem value={"12"}>Dezembro</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <div>
              Despesa total:{" "}
              <span style={{ fontWeight: "bold" }}>
                R$ {totalExpense.toLocaleString()}
              </span>
            </div>
          </Grid>
        </Grid>
      </header>
      <main>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(({ id, descricao, categoria, dia, valor }) => {
              return (
                <TableRow key={id}>
                  <TableCell>{descricao}</TableCell>
                  <TableCell>{categoria}</TableCell>
                  <TableCell>{dia}</TableCell>
                  <TableCell>{valor.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
