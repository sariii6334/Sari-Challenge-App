import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Home as HomeIcon,
  Users,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface WrongAnswerProps {
  settings: AppSettings;
  mode: 'solo' | 'friend' | GameMode;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

interface QuestionOption {
  id: 'correct_logic' | 'wrong_logic';
  labelAr: string;
  labelEn: string;
  labelTr: string;
  icon: string;
}

interface QuestionDef {
  questionAr: string;
  questionEn: string;
  questionTr: string;
  correctLogicOpt: QuestionOption;
  wrongLogicOpt: QuestionOption;
}

const TOTAL_QUESTIONS_PER_ROUND = 10;
const QUESTION_TIMER_SECONDS = 5;

const QUESTIONS: QuestionDef[] = [
  // 1
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فيل', labelEn: 'Elephant', labelTr: 'Fil', icon: '🐘' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فأر', labelEn: 'Mouse', labelTr: 'Fare', icon: '🐭' },
  },
  // 2
  {
    questionAr: 'من أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'أرنب', labelEn: 'Rabbit', labelTr: 'Tavşan', icon: '🐰' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سلحفاة', labelEn: 'Turtle', labelTr: 'Kaplumbağa', icon: '🐢' },
  },
  // 3
  {
    questionAr: 'من أطول؟',
    questionEn: 'Which is taller?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'زرافة', labelEn: 'Giraffe', labelTr: 'Zürafa', icon: '🦒' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'قطة', labelEn: 'Cat', labelTr: 'Kedi', icon: '🐱' },
  },
  // 4
  {
    questionAr: 'من أثقل؟',
    questionEn: 'Which is heavier?',
    questionTr: 'Hangisi daha ağır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شاحنة', labelEn: 'Truck', labelTr: 'Kamyon', icon: '🚛' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة', labelEn: 'Bicycle', labelTr: 'Bisiklet', icon: '🚲' },
  },
  // 5
  {
    questionAr: 'من أخطر؟',
    questionEn: 'Which is more dangerous?',
    questionTr: 'Hangisi daha tehlikeli?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'أسد', labelEn: 'Lion', labelTr: 'Aslan', icon: '🦁' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'أرنب', labelEn: 'Rabbit', labelTr: 'Tavşan', icon: '🐰' },
  },
  // 6
  {
    questionAr: 'من أضخم؟',
    questionEn: 'Which is larger?',
    questionTr: 'Hangisi daha iri?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حوت', labelEn: 'Whale', labelTr: 'Balina', icon: '🐋' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سمكة صغيرة', labelEn: 'Small Fish', labelTr: 'Küçük Balık', icon: '🐟' },
  },
  // 7
  {
    questionAr: 'من أعلى؟',
    questionEn: 'Which is higher?',
    questionTr: 'Hangisi daha yüksek?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'جبل', labelEn: 'Mountain', labelTr: 'Dağ', icon: '⛰️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حجر', labelEn: 'Stone', labelTr: 'Taş', icon: '🪨' },
  },
  // 8
  {
    questionAr: 'من أحر؟',
    questionEn: 'Which is hotter?',
    questionTr: 'Hangisi daha sıcak?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'نار', labelEn: 'Fire', labelTr: 'Ateş', icon: '🔥' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ثلج', labelEn: 'Ice', labelTr: 'Buz', icon: '🧊' },
  },
  // 9
  {
    questionAr: 'من أبرد؟',
    questionEn: 'Which is colder?',
    questionTr: 'Hangisi daha soğuk?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ثلج', labelEn: 'Ice', labelTr: 'Buz', icon: '🧊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'نار', labelEn: 'Fire', labelTr: 'Ateş', icon: '🔥' },
  },
  // 10
  {
    questionAr: 'من أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سيارة سباق', labelEn: 'Race Car', labelTr: 'Yarış Arabası', icon: '🏎️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة', labelEn: 'Bicycle', labelTr: 'Bisiklet', icon: '🚲' },
  },
  // 11
  {
    questionAr: 'من يطير؟',
    questionEn: 'Which one flies?',
    questionTr: 'Hangisi uçar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'نسر', labelEn: 'Eagle', labelTr: 'Kartal', icon: '🦅' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سلحفاة', labelEn: 'Turtle', labelTr: 'Kaplumbağa', icon: '🐢' },
  },
  // 12
  {
    questionAr: 'من يسبح؟',
    questionEn: 'Which one swims?',
    questionTr: 'Hangisi yüzer?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سمكة', labelEn: 'Fish', labelTr: 'Balık', icon: '🐟' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'جمل', labelEn: 'Camel', labelTr: 'Deve', icon: '🐪' },
  },
  // 13
  {
    questionAr: 'من يعيش في الماء؟',
    questionEn: 'Who lives in water?',
    questionTr: 'Hangisi suda yaşar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حوت', labelEn: 'Whale', labelTr: 'Balina', icon: '🐋' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حصان', labelEn: 'Horse', labelTr: 'At', icon: '🐎' },
  },
  // 14
  {
    questionAr: 'من يعيش في الصحراء؟',
    questionEn: 'Who lives in the desert?',
    questionTr: 'Hangisi çölde yaşar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'جمل', labelEn: 'Camel', labelTr: 'Deve', icon: '🐪' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'بطريق', labelEn: 'Penguin', labelTr: 'Penguen', icon: '🐧' },
  },
  // 15
  {
    questionAr: 'من له رقبة أطول؟',
    questionEn: 'Who has a longer neck?',
    questionTr: 'Hangisinin boynu daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'زرافة', labelEn: 'Giraffe', labelTr: 'Zürafa', icon: '🦒' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كلب', labelEn: 'Dog', labelTr: 'Köpek', icon: '🐶' },
  },
  // 16
  {
    questionAr: 'من له خرطوم؟',
    questionEn: 'Who has a trunk?',
    questionTr: 'Hangisinin hortumu var?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فيل', labelEn: 'Elephant', labelTr: 'Fil', icon: '🐘' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حصان', labelEn: 'Horse', labelTr: 'At', icon: '🐎' },
  },
  // 17
  {
    questionAr: 'من له جناحان؟',
    questionEn: 'Who has wings?',
    questionTr: 'Hangisinin kanatları var?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'عصفور', labelEn: 'Bird', labelTr: 'Kuş', icon: '🐦' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'بقرة', labelEn: 'Cow', labelTr: 'Inek', icon: '🐄' },
  },
  // 18
  {
    questionAr: 'من يأكل اللحوم؟',
    questionEn: 'Who eats meat?',
    questionTr: 'Hangisi et yer?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'أسد', labelEn: 'Lion', labelTr: 'Aslan', icon: '🦁' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'غزال', labelEn: 'Deer', labelTr: 'Geyik', icon: '🦌' },
  },
  // 19
  {
    questionAr: 'من يأكل العشب؟',
    questionEn: 'Who eats grass?',
    questionTr: 'Hangisi ot yer?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'بقرة', labelEn: 'Cow', labelTr: 'Inek', icon: '🐄' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ذئب', labelEn: 'Wolf', labelTr: 'Kurt', icon: '🐺' },
  },
  // 20
  {
    questionAr: 'من لديه ثمانية أرجل؟',
    questionEn: 'Who has eight legs?',
    questionTr: 'Hangisinin sekiz bacağı var?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'أخطبوط', labelEn: 'Octopus', labelTr: 'Ahtapot', icon: '🐙' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دجاجة', labelEn: 'Chicken', labelTr: 'Tavuk', icon: '🐔' },
  },
  // 21
  {
    questionAr: 'من أكبر كوكب؟',
    questionEn: 'Which planet is bigger?',
    questionTr: 'Hangisi daha büyük gezegendir?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'المشتري', labelEn: 'Jupiter', labelTr: 'Jüpiter', icon: '🪐' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'عطارد', labelEn: 'Mercury', labelTr: 'Merkür', icon: '🪨' },
  },
  // 22
  {
    questionAr: 'من أقرب للشمس؟',
    questionEn: 'Which is closer to the sun?',
    questionTr: 'Hangisi Güneş\'e daha yakın?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'عطارد', labelEn: 'Mercury', labelTr: 'Merkür', icon: '☀️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'نبتون', labelEn: 'Neptune', labelTr: 'Neptün', icon: '❄️' },
  },
  // 23
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'الأرض', labelEn: 'Earth', labelTr: 'Dünya', icon: '🌍' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كرة قدم', labelEn: 'Football', labelTr: 'Futbol Topu', icon: '⚽' },
  },
  // 24
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'القمر', labelEn: 'Moon', labelTr: 'Ay', icon: '🌙' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حصاة', labelEn: 'Pebble', labelTr: 'Çakıl Taş', icon: '🪨' },
  },
  // 25
  {
    questionAr: 'من أضخم؟',
    questionEn: 'Which is larger?',
    questionTr: 'Hangisi daha iri?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'طائرة', labelEn: 'Airplane', labelTr: 'Uçak', icon: '✈️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سيارة', labelEn: 'Car', labelTr: 'Araba', icon: '🚗' },
  },
  // 26
  {
    questionAr: 'من أطول؟',
    questionEn: 'Which is longer?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قطار', labelEn: 'Train', labelTr: 'Tren', icon: '🚆' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سيارة', labelEn: 'Car', labelTr: 'Araba', icon: '🚗' },
  },
  // 27
  {
    questionAr: 'من أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'طائرة', labelEn: 'Airplane', labelTr: 'Uçak', icon: '✈️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حصان', labelEn: 'Horse', labelTr: 'At', icon: '🐎' },
  },
  // 28
  {
    questionAr: 'من أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'صاروخ', labelEn: 'Rocket', labelTr: 'Roket', icon: '🚀' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة', labelEn: 'Bicycle', labelTr: 'Bisiklet', icon: '🚲' },
  },
  // 29
  {
    questionAr: 'من يضيء في النهار؟',
    questionEn: 'What shines during the day?',
    questionTr: 'Gündüz hangisi parlar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'الشمس', labelEn: 'Sun', labelTr: 'Güneş', icon: '☀️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'الفحم', labelEn: 'Coal', labelTr: 'Kömür', icon: '🖤' },
  },
  // 30
  {
    questionAr: 'من يذوب بالحرارة؟',
    questionEn: 'Which melts in heat?',
    questionTr: 'Sıcakta hangisi erir?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'الثلج', labelEn: 'Ice', labelTr: 'Buz', icon: '🧊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'الحديد', labelEn: 'Iron', labelTr: 'Demir', icon: '🧱' },
  },
  // 31
  {
    questionAr: 'من يطفو فوق الماء؟',
    questionEn: 'Which floats on water?',
    questionTr: 'Hangisi suda yüzer?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'خشب', labelEn: 'Wood', labelTr: 'Ahşap', icon: '🪵' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حجر', labelEn: 'Stone', labelTr: 'Taş', icon: '🪨' },
  },
  // 32
  {
    questionAr: 'من يغرق في الماء؟',
    questionEn: 'Which sinks in water?',
    questionTr: 'Hangisi suda batar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حجر', labelEn: 'Stone', labelTr: 'Taş', icon: '🪨' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فلين', labelEn: 'Cork', labelTr: 'Mantar', icon: '🍾' },
  },
  // 33
  {
    questionAr: 'من أقوى؟',
    questionEn: 'Which is stronger?',
    questionTr: 'Hangisi daha güçlü?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فيل', labelEn: 'Elephant', labelTr: 'Fil', icon: '🐘' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'نملة', labelEn: 'Ant', labelTr: 'Karınca', icon: '🐜' },
  },
  // 34
  {
    questionAr: 'من أصغر؟',
    questionEn: 'Which is smaller?',
    questionTr: 'Hangisi daha küçük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'نملة', labelEn: 'Ant', labelTr: 'Karınca', icon: '🐜' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فيل', labelEn: 'Elephant', labelTr: 'Fil', icon: '🐘' },
  },
  // 35
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حافلة', labelEn: 'Bus', labelTr: 'Otobüs', icon: '🚌' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة', labelEn: 'Bicycle', labelTr: 'Bisiklet', icon: '🚲' },
  },
  // 36
  {
    questionAr: 'من أنعم؟',
    questionEn: 'Which is softer?',
    questionTr: 'Hangisi daha yumuşak?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'وسادة', labelEn: 'Pillow', labelTr: 'Yastık', icon: '🛋️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'صخرة', labelEn: 'Rock', labelTr: 'Kaya', icon: '🪨' },
  },
  // 37
  {
    questionAr: 'من أصلب؟',
    questionEn: 'Which is harder?',
    questionTr: 'Hangisi daha sert?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حديد', labelEn: 'Iron', labelTr: 'Demir', icon: '🧱' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'إسفنج', labelEn: 'Sponge', labelTr: 'Sünger', icon: '🧽' },
  },
  // 38
  {
    questionAr: 'من أكثر ماءً؟',
    questionEn: 'Which has more water?',
    questionTr: 'Hangisinde daha çok su var?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'بحر', labelEn: 'Sea', labelTr: 'Deniz', icon: '🌊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كوب', labelEn: 'Cup', labelTr: 'Bardak', icon: '🥛' },
  },
  // 39
  {
    questionAr: 'من أطول؟',
    questionEn: 'Which is longer?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'نهر', labelEn: 'River', labelTr: 'Nehir', icon: '🌊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'جدول ماء', labelEn: 'Stream', labelTr: 'Dere', icon: '💧' },
  },
  // 40
  {
    questionAr: 'من أعلى؟',
    questionEn: 'Which is higher?',
    questionTr: 'Hangisi daha yüksek?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'طائرة', labelEn: 'Airplane', labelTr: 'Uçak', icon: '✈️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سيارة', labelEn: 'Car', labelTr: 'Araba', icon: '🚗' },
  },
  // 41
  {
    questionAr: 'من يكتب؟',
    questionEn: 'Which writes?',
    questionTr: 'Hangisi yazı yazar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قلم', labelEn: 'Pen', labelTr: 'Kalem', icon: '✏️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ملعقة', labelEn: 'Spoon', labelTr: 'Kaşık', icon: '🥄' },
  },
  // 42
  {
    questionAr: 'من يقطع؟',
    questionEn: 'Which cuts?',
    questionTr: 'Hangisi keser?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سكين', labelEn: 'Knife', labelTr: 'Bıçak', icon: '🔪' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'وسادة', labelEn: 'Pillow', labelTr: 'Yastık', icon: '🛋️' },
  },
  // 43
  {
    questionAr: 'من يضيء؟',
    questionEn: 'Which gives light?',
    questionTr: 'Hangisi ışık verir?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'مصباح', labelEn: 'Lamp', labelTr: 'Lamba', icon: '💡' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حجر', labelEn: 'Stone', labelTr: 'Taş', icon: '🪨' },
  },
  // 44
  {
    questionAr: 'من يبرد الطعام؟',
    questionEn: 'Which cools food?',
    questionTr: 'Hangisi soğutur?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ثلاجة', labelEn: 'Refrigerator', labelTr: 'Buzdolabı', icon: '🧊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فرن', labelEn: 'Oven', labelTr: 'Fırın', icon: '🔥' },
  },
  // 45
  {
    questionAr: 'من يسخن الطعام؟',
    questionEn: 'Which heats food?',
    questionTr: 'Hangisi ısıtır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فرن', labelEn: 'Oven', labelTr: 'Fırın', icon: '🔥' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ثلاجة', labelEn: 'Refrigerator', labelTr: 'Buzdolabı', icon: '🧊' },
  },
  // 46
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'منزل', labelEn: 'House', labelTr: 'Ev', icon: '🏠' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كرسي', labelEn: 'Chair', labelTr: 'Sandalye', icon: '🪑' },
  },
  // 47
  {
    questionAr: 'من أثقل؟',
    questionEn: 'Which is heavier?',
    questionTr: 'Hangisi daha ağır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ثلاجة', labelEn: 'Refrigerator', labelTr: 'Buzdolabı', icon: '🧊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'هاتف', labelEn: 'Phone', labelTr: 'Telefon', icon: '📱' },
  },
  // 48
  {
    questionAr: 'من أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'إنترنت الألياف', labelEn: 'Fiber Internet', labelTr: 'Fiber İnternet', icon: '⚡' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حمامة', labelEn: 'Pigeon', labelTr: 'Güvercin', icon: '🕊️' },
  },
  // 49
  {
    questionAr: 'من أطول؟',
    questionEn: 'Which is taller?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شجرة', labelEn: 'Tree', labelTr: 'Ağaç', icon: '🌳' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'زهرة', labelEn: 'Flower', labelTr: 'Çiçek', icon: '🌸' },
  },
  // 50
  {
    questionAr: 'من أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شمس', labelEn: 'Sun', labelTr: 'Güneş', icon: '☀️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كرة تنس', labelEn: 'Tennis Ball', labelTr: 'Tenis Topu', icon: '🎾' },
  },
  // 51
  {
    questionAr: 'أيهما أكثر حلاوة؟',
    questionEn: 'Which is sweeter?',
    questionTr: 'Hangisi daha tatlıdır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'عسل', labelEn: 'Honey', labelTr: 'Bal', icon: '🍯' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ليمون', labelEn: 'Lemon', labelTr: 'Limon', icon: '🍋' },
  },
  // 52
  {
    questionAr: 'أيهما أكثر ملوحة؟',
    questionEn: 'Which is saltier?',
    questionTr: 'Hangisi daha tuzludur?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ملح', labelEn: 'Salt', labelTr: 'Tuz', icon: '🧂' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سكر', labelEn: 'Sugar', labelTr: 'Şeker', icon: '🍬' },
  },
  // 53
  {
    questionAr: 'أيهما أكثر مرارة؟',
    questionEn: 'Which is more bitter?',
    questionTr: 'Hangisi daha acıdır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قهوة سوداء', labelEn: 'Black Coffee', labelTr: 'Sade Kahve', icon: '☕' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'عسل', labelEn: 'Honey', labelTr: 'Bal', icon: '🍯' },
  },
  // 54
  {
    questionAr: 'أيهما أكثر حموضة؟',
    questionEn: 'Which is more sour?',
    questionTr: 'Hangisi daha ekşidir?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ليمون', labelEn: 'Lemon', labelTr: 'Limon', icon: '🍋' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'موز', labelEn: 'Banana', labelTr: 'Muz', icon: '🍌' },
  },
  // 55
  {
    questionAr: 'أيهما أطول عمرًا؟',
    questionEn: 'Which lives longer?',
    questionTr: 'Hangisi daha uzun yaşar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سلحفاة', labelEn: 'Turtle', labelTr: 'Kaplumbağa', icon: '🐢' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ذبابة', labelEn: 'Fly', labelTr: 'Sinek', icon: '🪰' },
  },
  // 56
  {
    questionAr: 'أيهما أقوى؟',
    questionEn: 'Which is stronger?',
    questionTr: 'Hangisi daha güçlü?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'دب', labelEn: 'Bear', labelTr: 'Ayı', icon: '🐻' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'أرنب', labelEn: 'Rabbit', labelTr: 'Tavşan', icon: '🐰' },
  },
  // 57
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ديناصور', labelEn: 'Dinosaur', labelTr: 'Dinozor', icon: '🦕' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دجاجة', labelEn: 'Chicken', labelTr: 'Tavuk', icon: '🐔' },
  },
  // 58
  {
    questionAr: 'أيهما أخف؟',
    questionEn: 'Which is lighter?',
    questionTr: 'Hangisi daha hafif?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ريشة', labelEn: 'Feather', labelTr: 'Tüy', icon: '🪶' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'صخرة', labelEn: 'Rock', labelTr: 'Kaya', icon: '🪨' },
  },
  // 59
  {
    questionAr: 'أيهما أعلى صوتًا؟',
    questionEn: 'Which is louder?',
    questionTr: 'Hangisinin sesi daha yüksek?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'طائرة', labelEn: 'Airplane', labelTr: 'Uçak', icon: '✈️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'همسة', labelEn: 'Whisper', labelTr: 'Fısıltı', icon: '🤫' },
  },
  // 60
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'محيط', labelEn: 'Ocean', labelTr: 'Okyanus', icon: '🌊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'بركة', labelEn: 'Pond', labelTr: 'Gölet', icon: '🫧' },
  },
  // 61
  {
    questionAr: 'أيهما أوسع؟',
    questionEn: 'Which is wider?',
    questionTr: 'Hangisi daha geniş?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'صحراء', labelEn: 'Desert', labelTr: 'Çöl', icon: '🏜️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حديقة', labelEn: 'Garden', labelTr: 'Bahçe', icon: '🏡' },
  },
  // 62
  {
    questionAr: 'أيهما أطول؟',
    questionEn: 'Which is longer?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سور الصين العظيم', labelEn: 'Great Wall of China', labelTr: 'Çin Seddi', icon: '🧱' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'شارع', labelEn: 'Street', labelTr: 'Sokak', icon: '🛣️' },
  },
  // 63
  {
    questionAr: 'أيهما أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فهد (شيتا)', labelEn: 'Cheetah', labelTr: 'Çita', icon: '🐆' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'بقرة', labelEn: 'Cow', labelTr: 'Inek', icon: '🐄' },
  },
  // 64
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قارة', labelEn: 'Continent', labelTr: 'Kıta', icon: '🌍' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'جزيرة صغيرة', labelEn: 'Small Island', labelTr: 'Küçük Ada', icon: '🏝️' },
  },
  // 65
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'مدرسة', labelEn: 'School', labelTr: 'Okul', icon: '🏫' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'غرفة', labelEn: 'Room', labelTr: 'Oda', icon: '🚪' },
  },
  // 66
  {
    questionAr: 'أيهما أكثر حرارة؟',
    questionEn: 'Which is hotter?',
    questionTr: 'Hangisi daha sıcak?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'بركان', labelEn: 'Volcano', labelTr: 'Yanardağ', icon: '🌋' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ثلاجة', labelEn: 'Refrigerator', labelTr: 'Buzdolabı', icon: '🧊' },
  },
  // 67
  {
    questionAr: 'أيهما أبرد؟',
    questionEn: 'Which is colder?',
    questionTr: 'Hangisi daha soğuk?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'القطب الجنوبي', labelEn: 'Antarctica', labelTr: 'Antarktika', icon: '❄️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'صحراء', labelEn: 'Desert', labelTr: 'Çöl', icon: '🏜️' },
  },
  // 68
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شجرة نخيل', labelEn: 'Palm Tree', labelTr: 'Palmiye Ağacı', icon: '🌴' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'عشب', labelEn: 'Grass', labelTr: 'Çim', icon: '🌿' },
  },
  // 69
  {
    questionAr: 'أيهما أطول؟',
    questionEn: 'Which is taller?',
    questionTr: 'Hangisi daha yüksek?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'عمارة', labelEn: 'Building', labelTr: 'Bina', icon: '🏢' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'صندوق', labelEn: 'Box', labelTr: 'Kutu', icon: '📦' },
  },
  // 70
  {
    questionAr: 'أيهما أثقل؟',
    questionEn: 'Which is heavier?',
    questionTr: 'Hangisi daha ağır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'فيل', labelEn: 'Elephant', labelTr: 'Fil', icon: '🐘' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دجاجة', labelEn: 'Chicken', labelTr: 'Tavuk', icon: '🐔' },
  },
  // 71
  {
    questionAr: 'أيهما أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'برق', labelEn: 'Lightning', labelTr: 'Şimşek', icon: '⚡' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سلحفاة', labelEn: 'Turtle', labelTr: 'Kaplumbağa', icon: '🐢' },
  },
  // 72
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سفينة', labelEn: 'Ship', labelTr: 'Gemi', icon: '🚢' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'قارب صغير', labelEn: 'Small Boat', labelTr: 'Küçük Tekne', icon: '🛶' },
  },
  // 73
  {
    questionAr: 'أيهما أطول؟',
    questionEn: 'Which is longer?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حوت أزرق', labelEn: 'Blue Whale', labelTr: 'Mavi Balina', icon: '🐋' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'قطة', labelEn: 'Cat', labelTr: 'Kedi', icon: '🐱' },
  },
  // 74
  {
    questionAr: 'أيهما يلمع أكثر؟',
    questionEn: 'Which shines brighter?',
    questionTr: 'Hangisi daha çok parlar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شمس', labelEn: 'Sun', labelTr: 'Güneş', icon: '☀️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فحم', labelEn: 'Coal', labelTr: 'Kömür', icon: '🖤' },
  },
  // 75
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'ملعب كرة قدم', labelEn: 'Stadium', labelTr: 'Stadyum', icon: '⚽' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سجادة', labelEn: 'Carpet', labelTr: 'Halı', icon: '🪢' },
  },
  // 76
  {
    questionAr: 'أيهما يطير؟',
    questionEn: 'Which one flies?',
    questionTr: 'Hangisi uçar?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'طائرة', labelEn: 'Airplane', labelTr: 'Uçak', icon: '✈️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'سيارة', labelEn: 'Car', labelTr: 'Araba', icon: '🚗' },
  },
  // 77
  {
    questionAr: 'أيهما يسبح؟',
    questionEn: 'Which one swims?',
    questionTr: 'Hangisi yüzer?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'دلفين', labelEn: 'Dolphin', labelTr: 'Yunus', icon: '🐬' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'حصان', labelEn: 'Horse', labelTr: 'At', icon: '🐎' },
  },
  // 78
  {
    questionAr: 'أيهما أقوى؟',
    questionEn: 'Which is stronger?',
    questionTr: 'Hangisi daha güçlü?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'شاحنة', labelEn: 'Truck', labelTr: 'Kamyon', icon: '🚛' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة هوائية', labelEn: 'Bicycle', labelTr: 'Bisiklet', icon: '🚲' },
  },
  // 79
  {
    questionAr: 'أيهما أعلى؟',
    questionEn: 'Which is higher?',
    questionTr: 'Hangisi daha yüksek?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'سحاب', labelEn: 'Cloud', labelTr: 'Bulut', icon: '☁️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'شجرة', labelEn: 'Tree', labelTr: 'Ağaç', icon: '🌳' },
  },
  // 80
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قمر الأرض', labelEn: 'Earth Moon', labelTr: 'Dünya\'nın Ayı', icon: '🌙' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'كرة سلة', labelEn: 'Basketball', labelTr: 'Basketbol Topu', icon: '🏀' },
  },
  // 81
  {
    questionAr: 'أيهما أكثر عددًا؟',
    questionEn: 'Which is greater in number?',
    questionTr: 'Hangisinin sayısı daha fazla?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'أصابع اليد', labelEn: 'Hand Fingers', labelTr: 'El Parmakları', icon: '🖐️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'إصبع واحد', labelEn: 'One Finger', labelTr: 'Tek Parmak', icon: '☝️' },
  },
  // 82
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'كتاب', labelEn: 'Book', labelTr: 'Kitap', icon: '📖' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'ورقة', labelEn: 'Paper', labelTr: 'Kağıt', icon: '📄' },
  },
  // 83
  {
    questionAr: 'أيهما أثقل؟',
    questionEn: 'Which is heavier?',
    questionTr: 'Hangisi daha ağır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'حافلة', labelEn: 'Bus', labelTr: 'Otobüs', icon: '🚌' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'دراجة نارية', labelEn: 'Motorcycle', labelTr: 'Motosiklet', icon: '🏍️' },
  },
  // 84
  {
    questionAr: 'أيهما أسرع؟',
    questionEn: 'Which is faster?',
    questionTr: 'Hangisi daha hızlı?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قطار سريع', labelEn: 'Bullet Train', labelTr: 'Hızlı Tren', icon: '🚄' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'مشي', labelEn: 'Walking', labelTr: 'Yürümek', icon: '🚶' },
  },
  // 85
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'قصر', labelEn: 'Palace', labelTr: 'Saray', icon: '🏰' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'خيمة', labelEn: 'Tent', labelTr: 'Çadır', icon: '⛺' },
  },
  // 86
  {
    questionAr: 'أيهما يبرد المكان؟',
    questionEn: 'Which cools the room?',
    questionTr: 'Hangisi odayı soğutur?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'مكيف الهواء', labelEn: 'Air Conditioner', labelTr: 'Klima', icon: '❄️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'مدفأة', labelEn: 'Heater', labelTr: 'Isıtıcı', icon: '🔥' },
  },
  // 87
  {
    questionAr: 'أيهما يسخن؟',
    questionEn: 'Which is hot?',
    questionTr: 'Hangisi sıcaktır?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'الشمس', labelEn: 'Sun', labelTr: 'Güneş', icon: '☀️' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'الثلج', labelEn: 'Ice', labelTr: 'Buz', icon: '🧊' },
  },
  // 88
  {
    questionAr: 'أيهما أكبر؟',
    questionEn: 'Which is bigger?',
    questionTr: 'Hangisi daha büyük?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'كرة أرضية', labelEn: 'Globe', labelTr: 'Dünya Küresi', icon: '🌍' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'برتقالة', labelEn: 'Orange', labelTr: 'Portakal', icon: '🍊' },
  },
  // 89
  {
    questionAr: 'أيهما أخطر؟',
    questionEn: 'Which is more dangerous?',
    questionTr: 'Hangisi daha tehlikeli?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'تمساح', labelEn: 'Crocodile', labelTr: 'Timsah', icon: '🐊' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'فأر', labelEn: 'Mouse', labelTr: 'Fare', icon: '🐭' },
  },
  // 90
  {
    questionAr: 'أيهما أطول؟',
    questionEn: 'Which is longer?',
    questionTr: 'Hangisi daha uzun?',
    correctLogicOpt: { id: 'correct_logic', labelAr: 'جسر', labelEn: 'Bridge', labelTr: 'Köprü', icon: '🌉' },
    wrongLogicOpt: { id: 'wrong_logic', labelAr: 'باب', labelEn: 'Door', labelTr: 'Kapı', icon: '🚪' },
  },
];

function getRandom10Questions(): QuestionDef[] {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_QUESTIONS_PER_ROUND);
}

export const WrongAnswer: React.FC<WrongAnswerProps> = ({
  settings,
  mode,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['wrong-answer'] || getTranslations('en').games['wrong-answer'];

  // Game tracking state
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);

  // Round Questions State
  const [roundQuestions, setRoundQuestions] = useState<QuestionDef[]>(() => getRandom10Questions());
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem('sari_wrong_answer_best_v2');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [showP2Transition, setShowP2Transition] = useState<boolean>(false);

  // Shuffled options for current question
  const [shuffledChoices, setShuffledChoices] = useState<QuestionOption[]>([]);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [screenFlash, setScreenFlash] = useState<'green' | 'red' | null>(null);

  // Per question countdown
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Setup options for the current question
  const setupQuestion = useCallback((q: QuestionDef) => {
    setIsAnswering(false);
    setScreenFlash(null);

    const opts: QuestionOption[] = [q.correctLogicOpt, q.wrongLogicOpt];
    if (Math.random() > 0.5) {
      opts.reverse();
    }
    setShuffledChoices(opts);

    setTimeLeft(QUESTION_TIMER_SECONDS);
    startTimeRef.current = Date.now();
  }, []);

  // When questionIndex or roundQuestions changes, setup question
  useEffect(() => {
    if (roundQuestions[questionIndex]) {
      setupQuestion(roundQuestions[questionIndex]);
    }
  }, [questionIndex, roundQuestions, setupQuestion]);

  // Background music management during active play
  useEffect(() => {
    if (!showP2Transition) {
      soundManager.startBackgroundMusic(250);
    } else {
      soundManager.stopBackgroundMusic();
    }
    return () => {
      soundManager.stopBackgroundMusic();
    };
  }, [showP2Transition]);

  const getGrade = (score: number) => {
    if (score >= 9) return t.excellent;
    if (score >= 7) return t.veryGood;
    if (score >= 5) return t.good;
    return t.tryAgain;
  };

  // Finish Round of 10 questions
  const finishTurn = useCallback(
    (finalScoreOf10: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      soundManager.stopBackgroundMusic();

      const avgMs =
        responseTimes.length > 0
          ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000).toFixed(2)
          : '0.00';

      if (mode === 'solo') {
        if (finalScoreOf10 > bestScore) {
          setBestScore(finalScoreOf10);
          localStorage.setItem('sari_wrong_answer_best_v2', finalScoreOf10.toString());
        }

        soundManager.playWin();
        onFinish({
          gameId: 'wrong-answer',
          mode: 'solo',
          player1: {
            playerName: settings.player1Name,
            score: `${finalScoreOf10} / ${TOTAL_QUESTIONS_PER_ROUND}`,
            secondaryMetric: `${avgMs}s`,
          },
          grade: getGrade(finalScoreOf10),
        });
      } else {
        // 2 Player mode
        if (activePlayer === 1) {
          setP1Score(finalScoreOf10);
          setShowP2Transition(true);
        } else {
          const p2Final = finalScoreOf10;
          const winner =
            p1Score > p2Final
              ? 'player1'
              : p2Final > p1Score
              ? 'player2'
              : 'draw';

          soundManager.playWin();
          onFinish({
            gameId: 'wrong-answer',
            mode: 'friend',
            player1: {
              playerName: settings.player1Name,
              score: `${p1Score} / ${TOTAL_QUESTIONS_PER_ROUND}`,
            },
            player2: {
              playerName: settings.player2Name,
              score: `${p2Final} / ${TOTAL_QUESTIONS_PER_ROUND}`,
            },
            winner,
          });
        }
      }
    },
    [activePlayer, bestScore, mode, onFinish, p1Score, responseTimes, settings.player1Name, settings.player2Name, t]
  );

  // Advance to next question or complete 10 questions
  const advanceNextQuestion = useCallback(
    (isCorrect: boolean) => {
      const updatedScore = isCorrect ? currentScore + 1 : currentScore;
      if (isCorrect) {
        setCurrentScore(updatedScore);
      }

      if (questionIndex + 1 < TOTAL_QUESTIONS_PER_ROUND) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        // Round Finished!
        setTimeout(() => {
          finishTurn(updatedScore);
        }, 500);
      }
    },
    [currentScore, finishTurn, questionIndex]
  );

  // Timer countdown handler
  useEffect(() => {
    if (isAnswering || showP2Transition) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsAnswering(true);

          soundManager.playError();
          soundManager.vibrate(120);
          setScreenFlash('red');

          setTimeout(() => {
            advanceNextQuestion(false);
          }, 500);

          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advanceNextQuestion, isAnswering, showP2Transition]);

  // Handle choice tap
  const handleSelectChoice = (option: QuestionOption) => {
    if (isAnswering) return;

    setIsAnswering(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = Date.now() - startTimeRef.current;
    setResponseTimes((prev) => [...prev, elapsed]);

    // In Wrong Answer: player MUST choose the LOGICALLY WRONG option!
    if (option.id === 'wrong_logic') {
      // SUCCESS!
      soundManager.playTick();
      soundManager.playSuccess();
      soundManager.vibrate(30);
      setScreenFlash('green');

      setTimeout(() => {
        advanceNextQuestion(true);
      }, 400);
    } else {
      // FAILURE! Selected logically correct option by mistake
      soundManager.playError();
      soundManager.vibrate(120);
      setScreenFlash('red');

      setTimeout(() => {
        advanceNextQuestion(false);
      }, 500);
    }
  };

  const handleStartP2Turn = () => {
    setShowP2Transition(false);
    setActivePlayer(2);
    setQuestionIndex(0);
    setCurrentScore(0);
    setResponseTimes([]);
    setRoundQuestions(getRandom10Questions());
  };

  const currentQuestion = roundQuestions[questionIndex] || QUESTIONS[0];

  const questionText =
    settings.language === 'ar'
      ? currentQuestion.questionAr
      : settings.language === 'tr'
      ? currentQuestion.questionTr
      : currentQuestion.questionEn;

  // Timer ring math
  const strokeDash = 2 * Math.PI * 28;
  const progressPercent = Math.max(0, Math.min(1, timeLeft / QUESTION_TIMER_SECONDS));
  const dashOffset = strokeDash * (1 - progressPercent);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950 text-white p-4 md:p-6 select-none flex flex-col justify-between relative overflow-hidden transition-colors duration-300 ${
        screenFlash === 'green'
          ? 'ring-8 ring-emerald-500/80 bg-emerald-950/60'
          : screenFlash === 'red'
          ? 'ring-8 ring-rose-500/80 bg-rose-950/60'
          : ''
      }`}
    >
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full z-10">
        <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white/90 hover:text-white cursor-pointer active:scale-95"
          >
            <HomeIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-xs md:text-sm shadow-md">
              {gTrans.title}
            </span>
            {mode === 'friend' && (
              <span className="px-2.5 py-1 rounded-xl bg-white/10 text-rose-300 font-extrabold text-xs flex items-center gap-1 border border-white/10">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {activePlayer === 1 ? settings.player1Name : settings.player2Name}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-amber-300 font-black text-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{currentScore} / {TOTAL_QUESTIONS_PER_ROUND}</span>
          </div>
        </div>

        {/* Question Counter & Best Score */}
        <div className="flex items-center justify-between px-3 py-2 mt-2 text-xs font-bold text-white/80">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <span className="text-amber-300 font-black">
              {settings.language === 'ar' ? `السؤال ${questionIndex + 1} من ${TOTAL_QUESTIONS_PER_ROUND}` : `Question ${questionIndex + 1} of ${TOTAL_QUESTIONS_PER_ROUND}`}
            </span>
          </div>

          {mode === 'solo' && (
            <div className="flex items-center gap-1 text-rose-300">
              <Award className="w-4 h-4" />
              <span>
                {t.bestScore}: <strong className="text-white">{bestScore} / 10</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Playing Area */}
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col items-center justify-center my-4 z-10 gap-6">
        {/* Timer Circle */}
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="28"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="28"
              stroke={timeLeft > 1.2 ? '#f43f5e' : '#f59e0b'}
              strokeWidth="6"
              strokeDasharray={strokeDash}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span
              className={`text-xl font-black tracking-tighter ${
                timeLeft <= 1.0 ? 'text-amber-400 animate-ping' : 'text-white'
              }`}
            >
              {timeLeft.toFixed(1)}
            </span>
            <span className="text-[9px] text-white/60 font-bold uppercase">
              {gTrans.timeLeft}
            </span>
          </div>
        </div>

        {/* Core Instruction Warning Badge */}
        <div className="w-full bg-rose-500/20 border border-rose-500/40 rounded-2xl p-3 text-center flex items-center justify-center gap-2 shadow-inner">
          <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse shrink-0" />
          <span className="text-xs md:text-sm font-black text-rose-200 uppercase tracking-wide">
            {gTrans.chooseWrong}
          </span>
        </div>

        {/* Question Box */}
        <motion.div
          key={`q-${questionIndex}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-6 text-center shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-black text-amber-300 drop-shadow">
            {questionText}
          </h2>
        </motion.div>

        {/* 2 Choice Buttons */}
        <div className="w-full grid grid-cols-2 gap-4 px-2">
          {shuffledChoices.map((option) => {
            const label =
              settings.language === 'ar'
                ? option.labelAr
                : settings.language === 'tr'
                ? option.labelTr
                : option.labelEn;

            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnswering}
                onClick={() => handleSelectChoice(option)}
                className="group relative bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-white/20 hover:border-amber-400/80 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-xl cursor-pointer active:scale-95 transition-all"
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {option.icon}
                </span>
                <span className="text-lg md:text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-white/50 z-10 pb-2">
        <span>Sari Challenge • Offline Competitive Engine</span>
      </div>

      {/* Interstitial Modal for Player 2 (Friend Mode) */}
      <AnimatePresence>
        {showP2Transition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-sm w-full bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl font-black">
                P1
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {settings.player1Name} {t.finishedTurn}!
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  {t.passDeviceTo} <strong>{settings.player2Name}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  handleStartP2Turn();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-base shadow-lg hover:brightness-110 cursor-pointer active:scale-95 transition-all"
              >
                {t.startPlayerTurn} {settings.player2Name}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
