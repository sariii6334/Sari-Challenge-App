import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, Play, CheckCircle2, X, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface AdModalProps {
  isOpen: boolean;
  title?: string;
  rewardDescription?: string;
  onReward: () => void;
  onClose: () => void;
  language?: string;
}

export const AdModal: React.FC<AdModalProps> = () => {
  return null;
};
