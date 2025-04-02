import React, { useState, useEffect, useCallback } from 'react';
import { HOLIDAYS } from './constants/holidays';
import './Calendar.css';

type DateTimeMap = Map<string, string>;

interface CalendarProps {
  onSelectDate: (selectedDates: DateTimeMap) => void;
  defaultTime?: string; // Horário padrão (opcional)
  useDefaultTime?: boolean; // Flag para usar horário padrão
  onDefaultTimeChange?: (time: string) => void; // Callback para mudança no horário padrão
  onUseDefaultTimeChange?: (use: boolean) => void; // Callback para mudança no uso do horário padrão
}

const Calendar: React.FC<CalendarProps> = ({ 
  onSelectDate, 
  defaultTime = "08:00", 
  useDefaultTime = false,
  onDefaultTimeChange,
  onUseDefaultTimeChange
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState<DateTimeMap>(new Map());
  
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Formata a data para o formato MM-DD para verificar se é feriado
  const formatDateForHoliday = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  // Formata a data para o formato YYYY-MM-DD para armazenamento
  const formatDateForStorage = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Formata a data para exibição DD/MM/YYYY
  const formatDateForDisplay = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Verifica se duas datas são iguais (ano, mês e dia)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Verifica se uma data está selecionada
  const isDateSelected = (date: Date): boolean => {
    const dateStr = formatDateForStorage(date);
    return selectedDates.has(dateStr);
  };

  // Gera os dias do mês atual
  const generateDays = useCallback((): React.ReactNode[] => {
    const days: React.ReactNode[] = [];
    
    // Primeiro dia do mês atual
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    // Último dia do mês atual
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Dias do mês anterior para completar a primeira semana
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, prevMonthLastDay - i);
      days.push(
        <div key={`prev-${i}`} className="day inactive">
          {prevMonthLastDay - i}
        </div>
      );
    }
    
    // Dias do mês atual
    const today = new Date();
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateFormatted = formatDateForHoliday(date);
      const isHoliday = HOLIDAYS[dateFormatted];
      const isToday = isSameDay(date, today);
      
      days.push(
        <div
          key={`current-${i}`}
          className={`day ${isDateSelected(date) ? 'selected' : ''} ${isToday ? 'today' : ''} ${isHoliday ? 'holiday' : ''}`}
          onClick={() => toggleDateSelection(date)}
        >
          {i}
          {isHoliday && (
            <div className="holiday-tooltip">{isHoliday}</div>
          )}
        </div>
      );
    }
    
    // Dias do próximo mês para completar a última semana
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(
          <div key={`next-${i}`} className="day inactive">
            {i}
          </div>
        );
      }
    }
    
    return days;
  }, [currentMonth, currentYear, selectedDates]);

  // Altera a seleção de uma data
  const toggleDateSelection = (date: Date): void => {
    const dateStr = formatDateForStorage(date);
    const newSelectedDates = new Map(selectedDates);
    
    if (newSelectedDates.has(dateStr)) {
      newSelectedDates.delete(dateStr);
    } else {
      // Adiciona horário padrão ou 08:00
      newSelectedDates.set(dateStr, useDefaultTime ? defaultTime : '08:00');
    }
    
    setSelectedDates(newSelectedDates);
  };

  // Altera o horário de uma data selecionada
  const updateTime = (dateStr: string, time: string): void => {
    const newSelectedDates = new Map(selectedDates);
    if (newSelectedDates.has(dateStr)) {
      newSelectedDates.set(dateStr, time);
      setSelectedDates(newSelectedDates);
    }
  };

  // Remove uma data selecionada
  const removeDate = (dateStr: string): void => {
    const newSelectedDates = new Map(selectedDates);
    newSelectedDates.delete(dateStr);
    setSelectedDates(newSelectedDates);
  };

  // Muda para o mês anterior
  const prevMonth = (): void => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // Muda para o próximo mês
  const nextMonth = (): void => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Retorna para o mês atual
  const goToToday = (): void => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Notifica o componente pai sobre mudanças nas datas selecionadas
  useEffect(() => {
    onSelectDate(selectedDates);
  }, [selectedDates, onSelectDate]);

  // Aplica o horário padrão para todas as datas selecionadas
  useEffect(() => {
    if (useDefaultTime && selectedDates.size > 0) {
      const newSelectedDates = new Map(selectedDates);
      
      newSelectedDates.forEach((_, dateStr) => {
        newSelectedDates.set(dateStr, defaultTime);
      });
      
      setSelectedDates(newSelectedDates);
    }
  }, [useDefaultTime, defaultTime]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container vertical-layout">
        <div className="calendar">
          <div className="calendar-header">
            <h2>{months[currentMonth]} {currentYear}</h2>
            <div className="calendar-header-buttons">
              <button className="calendar-header-btn" onClick={prevMonth}>&#9664;</button>
              <button className="calendar-header-btn" onClick={goToToday}>Hoje</button>
              <button className="calendar-header-btn" onClick={nextMonth}>&#9654;</button>
            </div>
          </div>
          
          <div className="weekdays">
            {weekdays.map(day => <div key={day}>{day}</div>)}
          </div>
          
          <div className="days">
            {generateDays()}
          </div>
        </div>
        
        <div className="selected-dates-container">
          <div className="selected-dates-header">
            <h3>Datas Selecionadas</h3>
          </div>
          
          <div className="selected-dates-list">
            {selectedDates.size === 0 ? (
              <div className="no-dates-message">Nenhuma data selecionada</div>
            ) : (
              Array.from(selectedDates.entries()).map(([dateStr, time]) => (
                <div key={dateStr} className="selected-date-item">
                  <div className="selected-date-text">
                    {formatDateForDisplay(dateStr)}
                  </div>
                  <input
                    type="time"
                    className="time-input"
                    value={time}
                    onChange={(e) => updateTime(dateStr, e.target.value)}
                  />
                  <button
                    className="remove-date-btn"
                    onClick={() => removeDate(dateStr)}
                  >
                    &#10006;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 