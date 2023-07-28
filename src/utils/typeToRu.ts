const typeEnum = {
   start: 'Старт',
   decision: 'Условие',
   notice: 'Элемент',
   end: 'Конец'
}

export const typeToRu = (type: string): string => {
   return typeEnum[type as keyof typeof typeEnum];
}