import React, { useState } from "react";
import { Box, MaskedInput, Text, TextInput } from "grommet";

interface DateSelectorProps {
  ticks: number;
  onClick: () => void;
  onBlur: (ticks: number) => void;
}
interface SystemDate {
  hour: string;
  day: string;
  week: string;
  month: string;
  year: string;
  generation: string;
  toString: () => string;
}
const getDateFromTicks = (ticks: number): SystemDate => ({
  hour: `0${Math.floor(((ticks * 2) % 20) + 1)}`.substr(-2),
  day: `0${Math.floor(((ticks / 10) % 10) + 1)}`.substr(-2),
  week: `${Math.floor(((ticks / 100) % 5) + 1)}`,
  month: `0${Math.floor(((ticks / 500) % 10) + 1)}`.substr(-2),
  year: `00${Math.floor(ticks / 5000 + 1)}`.substr(-3),
  generation: `${Math.floor(ticks / 100000)}`,
  toString() {
    return `${this.generation}:${this.year}/${this.month}/(${this.week})/${this.day}::${this.hour}H`;
  }
});

const getTicksFromDate = (date: SystemDate): number => {
  const hourTicks = (parseInt(date.hour) - 1) / 2;
  const dayTicks = (parseInt(date.day) - 1) * 10;
  const weekTicks = (parseInt(date.week) - 1) * 100;
  const monthTicks = (parseInt(date.month) - 1) * 500;
  const yearTicks = (parseInt(date.year) - 1) * 5000;
  // const generationTicks = parseInt(date.generation) * 100000;
  return hourTicks + dayTicks + weekTicks + monthTicks + yearTicks;
};
const DateSelector = (props: DateSelectorProps) => {
  const [date, setDate] = useState(getDateFromTicks(props.ticks));
  const [prevTicks, setPrevTicks] = useState(null);

  if (props.ticks !== prevTicks) {
    setDate(getDateFromTicks(props.ticks));
    setPrevTicks(props.ticks);
  }

  return (
    <Box direction="row" align="center">
      <TextInput key="generations" value={date.generation} disabled />
      <Text>:</Text>
      <MaskedInput
        key="years"
        mask={[
          {
            length: [3],
            regexp: /^[0-9]$|^[0-9][0-9]$|^[0-9][0-9][0-9]$/,
            placeholder: "yyy"
          }
        ]}
        value={date.year}
        onChange={e => {
          setDate({ ...date, year: e.target.value });
        }}
        onBlur={() => {
          const finalYear = `00${!date.year ? 1 : date.year}`.substr(-3);
          setDate({ ...date, year: finalYear });
          props.onBlur(getTicksFromDate({ ...date, year: finalYear }));
        }}
        onClick={props.onClick}
      />
      <Text>/</Text>
      <MaskedInput
        key="months"
        mask={[
          {
            length: [2],
            regexp: /^[0-9]$|^[0-9][0-9]$/,
            placeholder: "mm"
          }
        ]}
        value={date.month}
        onChange={e => {
          setDate({ ...date, month: e.target.value });
        }}
        onBlur={() => {
          const finalMonth = `0${!date.month ? 1 : date.month}`.substr(-2);
          setDate({ ...date, month: finalMonth });
          props.onBlur(getTicksFromDate({ ...date, month: finalMonth }));
        }}
        onClick={props.onClick}
      />
      <Text>/(</Text>
      <MaskedInput
        key="weeks"
        mask={[
          {
            length: [1],
            regexp: /^[0-9]$/,
            placeholder: "w"
          }
        ]}
        value={date.week}
        onChange={e => {
          setDate({ ...date, week: e.target.value });
        }}
        onBlur={() => {
          const finalWeek = `${!date.week ? 1 : date.week}`.substr(-1);
          setDate({ ...date, week: finalWeek });
          props.onBlur(getTicksFromDate({ ...date, week: finalWeek }));
        }}
        onClick={props.onClick}
      />
      <Text>)/</Text>
      <MaskedInput
        key="days"
        mask={[
          {
            length: [2],
            regexp: /^[0-9]$|^[0-9][0-9]$/,
            placeholder: "dd"
          }
        ]}
        value={date.day}
        onChange={e => {
          setDate({ ...date, day: e.target.value });
        }}
        onBlur={() => {
          const finalDay = `0${!date.day ? 1 : date.day}`.substr(-2);
          setDate({ ...date, day: finalDay });
          props.onBlur(getTicksFromDate({ ...date, day: finalDay }));
        }}
        onClick={props.onClick}
        flex="shrink"
      />
      <Text>::</Text>
      <MaskedInput
        key="hours"
        mask={[
          {
            length: [2],
            regexp: /^[0-9]$|^[0-9][0-9]$/,
            placeholder: "hh"
          }
        ]}
        value={date.hour}
        onChange={e => {
          setDate({ ...date, hour: e.target.value });
        }}
        onBlur={() => {
          const finalHour = `0${!date.hour ? 1 : date.hour}`.substr(-2);
          setDate({ ...date, hour: finalHour });
          props.onBlur(getTicksFromDate({ ...date, hour: finalHour }));
        }}
        onClick={props.onClick}
        flex="shrink"
      />
      <Text>H</Text>
    </Box>
  );
};

export default DateSelector;
