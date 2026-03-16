import { Clock, Calendar } from 'lucide-react';

const scheduleData = [
  {
    day: 'Sexta',
    date: '15/05',
    items: [
      { label: 'Abertura', time: '10h – 12h' },
      { label: 'Funcionamento da feira', time: '13h – 21h' },
    ],
  },
  {
    day: 'Sábado',
    date: '16/05',
    items: [
      { label: 'Evento fechado ABIP', time: '9h – 13h' },
      { label: 'Funcionamento da feira', time: '13h – 21h' },
    ],
  },
  {
    day: 'Domingo',
    date: '17/05',
    items: [
      { label: 'Funcionamento da feira', time: '10h – 18h' },
    ],
  },
];

const Schedule = () => {
  return (
    <section id="horario" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Horário de realização da Panifair
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              15, 16 e 17 de maio de 2026 · Centerminas Expo, Belo Horizonte
            </p>
          </div>

          {/* Schedule Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {scheduleData.map((day) => (
              <div
                key={day.day}
                className="bg-card p-6 rounded-2xl border border-border/50 shadow-elegant hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-foreground">
                      {day.day}
                    </h3>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {day.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0"
                    >
                      <span className="text-foreground font-medium">
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 text-primary font-semibold shrink-0">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
