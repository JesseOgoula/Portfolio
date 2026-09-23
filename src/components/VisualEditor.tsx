import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Trash2,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sliders,
  X,
  ChevronRight,
  Layers,
  Sparkles,
  Type,
  MousePointer,
  Box,
  RefreshCw,
  Move,
} from 'lucide-react';

export interface ElementChange {
  id: string;
  elementUid: string;
  selector: string;
  sectionLabel: string;
  elementLabel: string;
  tag: string;
  actionType: 'delete' | 'scale' | 'translate' | 'reorder' | 'text' | 'margin' | 'opacity';
  description: string;
  details: {
    scale?: number;
    translateX?: number;
    translateY?: number;
    orderDelta?: number;
    isDeleted?: boolean;
    textBefore?: string;
    textAfter?: string;
    marginTop?: number;
    opacity?: number;
  };
  timestamp: string;
}

interface ElementState {
  scale: number;
  translateX: number;
  translateY: number;
  marginTop: number;
  opacity: number;
  isDeleted: boolean;
  order?: number;
  originalText: string | null;
}

let uidCounter = 0;
const getOrAssignUid = (el: HTMLElement): string => {
  let uid = el.getAttribute('data-v-editor-uid');
  if (!uid) {
    uid = `v-el-${++uidCounter}`;
    el.setAttribute('data-v-editor-uid', uid);
  }
  return uid;
};

export const VisualEditor: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [selectionMode, setSelectionMode] = useState<'precise' | 'section'>('precise');
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<HTMLElement[]>([]);
  const [changes, setChanges] = useState<ElementChange[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');
  const [sections, setSections] = useState<{ id: string; label: string; element: HTMLElement }[]>([]);

  // Persistent element states
  const elementStates = useRef<Map<string, ElementState>>(new Map());
  const selectedElRef = useRef<HTMLElement | null>(null);
  selectedElRef.current = selectedEl;

  // Floating toolbar position
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

  // Toggle body class for native cursor & pointer-events
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('visual-editor-mode-active');
    } else {
      document.body.classList.remove('visual-editor-mode-active');
      if (selectedElRef.current) {
        selectedElRef.current.style.removeProperty('outline');
        selectedElRef.current.style.removeProperty('outline-offset');
      }
    }
    return () => {
      document.body.classList.remove('visual-editor-mode-active');
    };
  }, [isActive]);

  // Scan sections with [data-editor-id]
  const refreshSections = useCallback(() => {
    const found = document.querySelectorAll<HTMLElement>('[data-editor-id]');
    const list: { id: string; label: string; element: HTMLElement }[] = [];
    found.forEach((el) => {
      const id = el.getAttribute('data-editor-id') || '';
      const label = el.getAttribute('data-editor-label') || id;
      list.push({ id, label, element: el });
    });
    setSections(list);
  }, []);

  useEffect(() => {
    if (isActive) {
      refreshSections();
    }
  }, [isActive, refreshSections]);

  // Update floating toolbar position and direct visual outline on selected element
  const updateSelectionVisuals = useCallback((el: HTMLElement | null) => {
    // Clear previous outlines
    document.querySelectorAll<HTMLElement>('[data-v-editor-selected]').forEach((node) => {
      node.style.removeProperty('outline');
      node.style.removeProperty('outline-offset');
      node.removeAttribute('data-v-editor-selected');
    });

    if (!el || !document.body.contains(el)) {
      setToolbarPos(null);
      return;
    }

    el.setAttribute('data-v-editor-selected', 'true');
    el.style.setProperty('outline', '2px solid #E5FF00', 'important');
    el.style.setProperty('outline-offset', '2px', 'important');

    const rect = el.getBoundingClientRect();
    const top = Math.max(10, rect.top > 60 ? rect.top - 44 : rect.bottom + 8);
    const left = Math.max(10, Math.min(window.innerWidth - 320, rect.left));
    setToolbarPos({ top, left });
  }, []);

  // Sync selection change
  useEffect(() => {
    updateSelectionVisuals(selectedEl);

    if (selectedEl) {
      const uid = getOrAssignUid(selectedEl);
      const state = getElementState(uid);
      if (state.originalText === null) {
        state.originalText = selectedEl.innerText || selectedEl.textContent || '';
      }
      setTextValue(selectedEl.innerText || selectedEl.textContent || '');

      // Compute breadcrumbs
      const crumbs: HTMLElement[] = [];
      let curr: HTMLElement | null = selectedEl;
      while (curr && curr !== document.body && !curr.classList.contains('visual-editor-portal')) {
        crumbs.unshift(curr);
        curr = curr.parentElement;
      }
      setBreadcrumbs(crumbs);
    } else {
      setTextValue('');
      setBreadcrumbs([]);
    }
  }, [selectedEl, updateSelectionVisuals]);

  // Update toolbar on scroll
  useEffect(() => {
    if (!isActive || !selectedEl) return;
    const handleScrollOrResize = () => {
      updateSelectionVisuals(selectedEl);
    };
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isActive, selectedEl, updateSelectionVisuals]);

  // Helper: descriptor
  const getDescriptor = (el: HTMLElement) => {
    const parentSection = el.closest('[data-editor-id]') as HTMLElement | null;
    const sectionLabel =
      parentSection?.getAttribute('data-editor-label') ||
      parentSection?.getAttribute('data-editor-id') ||
      'Général';

    if (el.hasAttribute('data-editor-id')) {
      return {
        sectionLabel,
        elementLabel:
          el.getAttribute('data-editor-label') || el.getAttribute('data-editor-id') || 'Section',
        tag: el.tagName.toLowerCase(),
      };
    }

    const tag = el.tagName.toLowerCase();
    let textPreview = '';
    if (tag === 'img') {
      textPreview =
        (el as HTMLImageElement).alt ||
        (el as HTMLImageElement).src.split('/').pop() ||
        'Image';
    } else {
      const clone = el.cloneNode(true) as HTMLElement;
      textPreview = (clone.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 25);
    }

    const label = textPreview
      ? `${tag.toUpperCase()} ("${textPreview}${textPreview.length >= 25 ? '...' : ''}")`
      : tag.toUpperCase();

    return {
      sectionLabel,
      elementLabel: label,
      tag,
    };
  };

  // State getter
  const getElementState = (uid: string): ElementState => {
    if (!elementStates.current.has(uid)) {
      elementStates.current.set(uid, {
        scale: 1,
        translateX: 0,
        translateY: 0,
        marginTop: 0,
        opacity: 1,
        isDeleted: false,
        originalText: null,
      });
    }
    return elementStates.current.get(uid)!;
  };

  // Apply state to DOM element
  const applyStyles = (el: HTMLElement, state: ElementState) => {
    // 1. Delete / Display
    if (state.isDeleted) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
    } else {
      el.style.removeProperty('display');
      el.style.removeProperty('visibility');
    }

    // 2. Transform (Scale & Translate)
    const computed = window.getComputedStyle(el);
    if (
      computed.display === 'inline' &&
      (state.scale !== 1 || state.translateX !== 0 || state.translateY !== 0)
    ) {
      el.style.setProperty('display', 'inline-block', 'important');
    }

    const transforms: string[] = [];
    if (state.translateX !== 0 || state.translateY !== 0) {
      transforms.push(`translate(${state.translateX}px, ${state.translateY}px)`);
    }
    if (state.scale !== 1) {
      transforms.push(`scale(${state.scale})`);
    }

    if (transforms.length > 0) {
      el.style.setProperty('transform', transforms.join(' '), 'important');
      el.style.setProperty('transform-origin', 'center center', 'important');
      el.style.setProperty('transition', 'transform 0.1s ease-out', 'important');
    } else {
      el.style.removeProperty('transform');
      el.style.removeProperty('transform-origin');
      el.style.removeProperty('transition');
    }

    // 3. Margin Top
    if (state.marginTop !== 0) {
      el.style.setProperty('margin-top', `${state.marginTop}px`, 'important');
    } else {
      el.style.removeProperty('margin-top');
    }

    // 4. Opacity
    if (state.opacity !== 1) {
      el.style.setProperty('opacity', String(state.opacity), 'important');
    } else {
      el.style.removeProperty('opacity');
    }

    // 5. Order
    if (state.order !== undefined) {
      el.style.setProperty('order', String(state.order), 'important');
    }

    updateSelectionVisuals(el);
  };

  // Action: Toggle Delete / Visibility
  const toggleDeleteElement = (el: HTMLElement) => {
    const uid = getOrAssignUid(el);
    const state = getElementState(uid);
    state.isDeleted = !state.isDeleted;
    applyStyles(el, state);

    const desc = getDescriptor(el);
    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: el.getAttribute('data-editor-id')
        ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'delete',
      description: state.isDeleted ? 'Supprimé / Masqué' : 'Réaffiché',
      details: { isDeleted: state.isDeleted },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'delete')),
    ]);
  };

  // Action: Scale
  const setScale = (el: HTMLElement, newScale: number) => {
    const uid = getOrAssignUid(el);
    const state = getElementState(uid);
    state.scale = Math.max(0.1, Math.min(4, +newScale.toFixed(2)));
    applyStyles(el, state);

    const desc = getDescriptor(el);
    const percent = Math.round(state.scale * 100);
    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: el.getAttribute('data-editor-id')
        ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'scale',
      description: `Échelle modifiée à ${percent}%`,
      details: { scale: state.scale },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'scale')),
    ]);
  };

  // Action: Translate Position
  const setTranslation = (el: HTMLElement, x: number, y: number) => {
    const uid = getOrAssignUid(el);
    const state = getElementState(uid);
    state.translateX = Math.round(x);
    state.translateY = Math.round(y);
    applyStyles(el, state);

    const desc = getDescriptor(el);
    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: el.getAttribute('data-editor-id')
        ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'translate',
      description: `Position décalée (X: ${state.translateX > 0 ? '+' : ''}${state.translateX}px, Y: ${state.translateY > 0 ? '+' : ''}${state.translateY}px)`,
      details: { translateX: state.translateX, translateY: state.translateY },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'translate')),
    ]);
  };

  // Action: Margin Top
  const setMargin = (el: HTMLElement, margin: number) => {
    const uid = getOrAssignUid(el);
    const state = getElementState(uid);
    state.marginTop = margin;
    applyStyles(el, state);

    const desc = getDescriptor(el);
    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: el.getAttribute('data-editor-id')
        ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'margin',
      description: `Marge supérieure : ${state.marginTop > 0 ? '+' : ''}${state.marginTop}px`,
      details: { marginTop: state.marginTop },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'margin')),
    ]);
  };

  // Action: Opacity
  const setOpacity = (el: HTMLElement, opacity: number) => {
    const uid = getOrAssignUid(el);
    const state = getElementState(uid);
    state.opacity = opacity;
    applyStyles(el, state);

    const desc = getDescriptor(el);
    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: el.getAttribute('data-editor-id')
        ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'opacity',
      description: `Opacité réglée à ${Math.round(state.opacity * 100)}%`,
      details: { opacity: state.opacity },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'opacity')),
    ]);
  };

  // Action: Reorder Sibling
  const reorderSibling = (el: HTMLElement, direction: 'up' | 'down') => {
    const parent = el.parentElement;
    if (!parent) return;

    const parentComputed = window.getComputedStyle(parent);
    if (parentComputed.display !== 'flex' && parentComputed.display !== 'grid') {
      parent.style.setProperty('display', 'flex', 'important');
      parent.style.setProperty('flex-direction', 'column', 'important');
    }

    const siblings = Array.from(parent.children) as HTMLElement[];
    siblings.forEach((sib, idx) => {
      if (!sib.style.order) {
        sib.style.setProperty('order', String(idx * 10), 'important');
      }
    });

    const currIdx = siblings.indexOf(el);
    const targetIdx = direction === 'up' ? currIdx - 1 : currIdx + 1;

    if (targetIdx >= 0 && targetIdx < siblings.length) {
      const targetEl = siblings[targetIdx];
      const currOrder = parseInt(el.style.order || String(currIdx * 10), 10);
      const targetOrder = parseInt(targetEl.style.order || String(targetIdx * 10), 10);

      el.style.setProperty('order', String(targetOrder), 'important');
      targetEl.style.setProperty('order', String(currOrder), 'important');

      const uid = getOrAssignUid(el);
      const state = getElementState(uid);
      state.order = targetOrder;

      const desc = getDescriptor(el);
      const newChange: ElementChange = {
        id: `chg-${Date.now()}-${Math.random()}`,
        elementUid: uid,
        selector: el.getAttribute('data-editor-id')
          ? `[data-editor-id="${el.getAttribute('data-editor-id')}"]`
          : desc.tag,
        sectionLabel: desc.sectionLabel,
        elementLabel: desc.elementLabel,
        tag: desc.tag,
        actionType: 'reorder',
        description: direction === 'up' ? 'Déplacé vers le haut' : 'Déplacé vers le bas',
        details: { orderDelta: direction === 'up' ? -1 : 1 },
        timestamp: new Date().toLocaleTimeString('fr-FR'),
      };

      setChanges((prev) => [
        newChange,
        ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'reorder')),
      ]);
    }
  };

  // Action: Live text update
  const handleTextChange = (newText: string) => {
    if (!selectedEl) return;
    setTextValue(newText);
    selectedEl.innerText = newText;

    const uid = getOrAssignUid(selectedEl);
    const state = getElementState(uid);
    const desc = getDescriptor(selectedEl);

    const newChange: ElementChange = {
      id: `chg-${Date.now()}-${Math.random()}`,
      elementUid: uid,
      selector: selectedEl.getAttribute('data-editor-id')
        ? `[data-editor-id="${selectedEl.getAttribute('data-editor-id')}"]`
        : desc.tag,
      sectionLabel: desc.sectionLabel,
      elementLabel: desc.elementLabel,
      tag: desc.tag,
      actionType: 'text',
      description: `Texte modifié : "${newText.slice(0, 30)}${newText.length > 30 ? '...' : ''}"`,
      details: { textBefore: state.originalText || '', textAfter: newText },
      timestamp: new Date().toLocaleTimeString('fr-FR'),
    };

    setChanges((prev) => [
      newChange,
      ...prev.filter((c) => !(c.elementUid === uid && c.actionType === 'text')),
    ]);
  };

  // Reset single element
  const resetElement = (uid: string) => {
    const el = document.querySelector<HTMLElement>(`[data-v-editor-uid="${uid}"]`);
    const state = elementStates.current.get(uid);
    if (el && state) {
      if (state.originalText !== null) {
        el.innerText = state.originalText;
        if (selectedEl === el) {
          setTextValue(state.originalText);
        }
      }

      state.scale = 1;
      state.translateX = 0;
      state.translateY = 0;
      state.marginTop = 0;
      state.opacity = 1;
      state.isDeleted = false;
      state.order = undefined;
      applyStyles(el, state);
    }

    setChanges((prev) => prev.filter((c) => c.elementUid !== uid));
  };

  // Reset all
  const resetAll = () => {
    elementStates.current.forEach((_, uid) => {
      resetElement(uid);
    });
    elementStates.current.clear();
    setChanges([]);
    setSelectedEl(null);
    setHoveredEl(null);
  };

  // Check if click was inside editor UI
  const isEditorUI = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof Node)) return false;
    const el = target instanceof Element ? target : target.parentElement;
    if (!el) return false;
    return Boolean(
      el.closest('#visual-editor-root') ||
      el.closest('.visual-editor-portal') ||
      el.closest('[data-editor-control="true"]')
    );
  };

  // Click & Hover Inspector on page
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isEditorUI(e.target)) {
        setHoveredEl(null);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (!target || target === document.body || target === document.documentElement) {
        setHoveredEl(null);
        return;
      }

      let candidate = target;
      if (selectionMode === 'section') {
        const sec = target.closest<HTMLElement>('[data-editor-id]');
        if (sec) candidate = sec;
      }

      if (candidate !== hoveredEl) {
        setHoveredEl(candidate);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // If clicking inside editor UI, do NOT intercept! Let React handle it!
      if (isEditorUI(e.target)) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target || target === document.body || target === document.documentElement) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      let candidate = target;
      if (selectionMode === 'section') {
        const sec = target.closest<HTMLElement>('[data-editor-id]');
        if (sec) candidate = sec;
      }

      setSelectedEl(candidate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isActive, hoveredEl, selectionMode]);

  // Keyboard nudge
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsActive((prev) => !prev);
        return;
      }

      if (!isActive) return;

      if (e.key === 'Escape') {
        setSelectedEl(null);
        return;
      }

      if (
        selectedEl &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        const step = e.shiftKey ? 20 : 5;
        const uid = getOrAssignUid(selectedEl);
        const state = getElementState(uid);

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setTranslation(selectedEl, state.translateX, state.translateY - step);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setTranslation(selectedEl, state.translateX, state.translateY + step);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setTranslation(selectedEl, state.translateX - step, state.translateY);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setTranslation(selectedEl, state.translateX + step, state.translateY);
        } else if (e.key === 'Delete') {
          e.preventDefault();
          toggleDeleteElement(selectedEl);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, selectedEl]);

  // Export summary
  const generateExportSummary = () => {
    if (changes.length === 0) {
      return 'Aucune modification enregistrée.';
    }

    let output = `### RÉCAPITULATIF DES MODIFICATIONS VISUELLES DU PORTFOLIO\n`;
    output += `Date: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}\n`;
    output += `Total de modifications: ${changes.length}\n\n`;

    const bySection: { [section: string]: ElementChange[] } = {};
    changes.forEach((chg) => {
      if (!bySection[chg.sectionLabel]) {
        bySection[chg.sectionLabel] = [];
      }
      bySection[chg.sectionLabel].push(chg);
    });

    let index = 1;
    for (const [secName, sectionChanges] of Object.entries(bySection)) {
      output += `#### SECTION : ${secName}\n`;
      sectionChanges.forEach((chg) => {
        let tag = '[MODIFIÉ]';
        if (chg.actionType === 'delete') tag = '[SUPPRIMÉ / MASQUÉ]';
        if (chg.actionType === 'scale') tag = '[REDIMENSIONNÉ (ÉCHELLE)]';
        if (chg.actionType === 'translate') tag = '[DÉPLACÉ (POSITION)]';
        if (chg.actionType === 'margin') tag = '[ESPACEMENT VERTICAL]';
        if (chg.actionType === 'opacity') tag = '[OPACITÉ]';
        if (chg.actionType === 'reorder') tag = '[RÉORGANISÉ DANS L\'ORDRE]';
        if (chg.actionType === 'text') tag = '[TEXTE MODIFIÉ]';

        output += `${index}. ${tag} ${chg.elementLabel}\n`;
        output += `   - Description : ${chg.description}\n`;
        if (chg.details.scale !== undefined) {
          output += `   - Nouvelle échelle : ${Math.round(chg.details.scale * 100)}%\n`;
        }
        if (chg.details.translateX || chg.details.translateY) {
          output += `   - Décalage X / Y : X=${chg.details.translateX || 0}px, Y=${chg.details.translateY || 0}px\n`;
        }
        if (chg.details.marginTop !== undefined) {
          output += `   - Marge haute : ${chg.details.marginTop}px\n`;
        }
        if (chg.details.opacity !== undefined) {
          output += `   - Opacité : ${Math.round(chg.details.opacity * 100)}%\n`;
        }
        if (chg.details.textAfter !== undefined) {
          output += `   - Nouveau texte : "${chg.details.textAfter}"\n`;
        }
        if (chg.details.orderDelta !== undefined) {
          output += `   - Décalage d'ordre : ${chg.details.orderDelta > 0 ? '+' : ''}${chg.details.orderDelta}\n`;
        }
        output += `   - Balise HTML : <${chg.tag}>\n\n`;
        index++;
      });
    }

    output += `---\nInstructions pour l'assistant : Applique ces modifications fidèlement dans les composants React / Tailwind CSS du portfolio.\n`;
    return output;
  };

  const copyToClipboard = () => {
    const text = generateExportSummary();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const selectedUid = selectedEl ? getOrAssignUid(selectedEl) : null;
  const selectedState = selectedUid ? getElementState(selectedUid) : null;
  const selectedDesc = selectedEl ? getDescriptor(selectedEl) : null;

  return createPortal(
    <div
      id="visual-editor-root"
      className="visual-editor-portal font-mono text-xs select-none"
      data-editor-control="true"
    >
      {/* Styles to disable custom cursor and enable direct selection */}
      <style>{`
        body.visual-editor-mode-active .cursor-circle,
        body.visual-editor-mode-active [class*="cursor-circle"],
        body.visual-editor-mode-active .z-\[9999\] {
          display: none !important;
          pointer-events: none !important;
        }
        body.visual-editor-mode-active {
          cursor: default !important;
        }
        body.visual-editor-mode-active #root * {
          pointer-events: auto !important;
        }
      `}</style>

      {/* 1. FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-5 right-5 z-[99999] flex items-center gap-2" data-editor-control="true">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2.5 px-4 py-2.5 font-bold uppercase tracking-wider text-[11px] border transition-all duration-200 shadow-2xl ${
            isActive
              ? 'bg-[#E5FF00] text-black border-[#E5FF00] shadow-[0_0_25px_rgba(229,255,0,0.4)]'
              : 'bg-[#080808]/95 text-white/90 border-[#262626] hover:border-white hover:text-white backdrop-blur-md'
          }`}
          title="Raccourci: Ctrl+Shift+E"
        >
          {isActive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>MODE ÉDITION ACTIF</span>
              {changes.length > 0 && (
                <span className="bg-black text-[#E5FF00] px-1.5 py-0.5 text-[10px] font-extrabold">
                  {changes.length}
                </span>
              )}
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#E5FF00]" />
              <span>ÉDITEUR VISUEL</span>
              {changes.length > 0 && (
                <span className="bg-[#E5FF00] text-black px-1.5 py-0.5 text-[10px] font-bold">
                  {changes.length}
                </span>
              )}
            </>
          )}
        </button>

        {isActive && (
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="p-2.5 bg-[#080808]/95 border border-[#262626] text-white/90 hover:text-white hover:border-white backdrop-blur-md transition-colors"
            title="Ouvrir/fermer le panneau d'inspection"
          >
            <Sliders className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. FLOATING MINI QUICK TOOLBAR ABOVE SELECTED ELEMENT */}
      {isActive && !isPreviewMode && toolbarPos && selectedEl && (
        <div
          className="fixed z-[99997] flex items-center gap-1.5 p-1.5 bg-[#080808] border border-[#E5FF00] text-white shadow-2xl backdrop-blur-md"
          style={{ top: `${toolbarPos.top}px`, left: `${toolbarPos.left}px` }}
          data-editor-control="true"
        >
          <span className="px-2 py-0.5 bg-[#141414] text-[#E5FF00] font-bold text-[10px] truncate max-w-[130px]">
            {selectedDesc?.elementLabel}
          </span>

          <button
            onClick={() => setScale(selectedEl, (selectedState?.scale || 1) - 0.1)}
            className="p-1 hover:bg-[#1A1A1A] hover:text-[#E5FF00] text-gray-300"
            title="Rétrécir (-10%)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setScale(selectedEl, (selectedState?.scale || 1) + 0.1)}
            className="p-1 hover:bg-[#1A1A1A] hover:text-[#E5FF00] text-gray-300"
            title="Agrandir (+10%)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3.5 bg-[#2B2B2B]" />

          <button
            onClick={() => reorderSibling(selectedEl, 'up')}
            className="p-1 hover:bg-[#1A1A1A] hover:text-[#E5FF00] text-gray-300"
            title="Monter dans l'ordre"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => reorderSibling(selectedEl, 'down')}
            className="p-1 hover:bg-[#1A1A1A] hover:text-[#E5FF00] text-gray-300"
            title="Descendre dans l'ordre"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3.5 bg-[#2B2B2B]" />

          <button
            onClick={() => toggleDeleteElement(selectedEl)}
            className="p-1 hover:bg-red-950/60 hover:text-red-400 text-red-500"
            title={selectedState?.isDeleted ? 'Réafficher' : 'Masquer / Supprimer'}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setSelectedEl(null)}
            className="p-1 hover:bg-[#1A1A1A] text-gray-400 hover:text-white"
            title="Fermer la sélection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. SIDE INSPECTION & CONTROL PANEL */}
      {isActive && isPanelOpen && (
        <aside
          className="fixed top-0 right-0 h-full w-[380px] bg-[#0A0A0A]/98 border-l border-[#222222] z-[99998] flex flex-col text-white shadow-2xl backdrop-blur-xl"
          data-editor-control="true"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-[#222222] flex items-center justify-between bg-[#0F0F0F]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E5FF00] animate-pulse" />
              <span className="font-bold text-[11px] tracking-widest text-[#F4F4F4] uppercase">
                STUDIO INSPECTOR
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`p-1.5 border transition-colors ${
                  isPreviewMode
                    ? 'bg-[#E5FF00] text-black border-[#E5FF00]'
                    : 'bg-[#161616] text-gray-400 border-[#2b2b2b] hover:text-white'
                }`}
                title={isPreviewMode ? 'Réafficher les repères' : 'Aperçu propre'}
              >
                {isPreviewMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1.5 bg-[#161616] border border-[#2b2b2b] text-gray-400 hover:text-white"
                title="Masquer le panneau"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Target selection mode */}
          <div className="px-3.5 py-2 bg-[#121212] border-b border-[#222222] flex items-center justify-between text-[10px]">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Cible du clic :</span>
            <div className="flex items-center gap-1 bg-[#1A1A1A] p-0.5 border border-[#2B2B2B]">
              <button
                onClick={() => setSelectionMode('precise')}
                className={`px-2 py-0.5 flex items-center gap-1 transition-colors ${
                  selectionMode === 'precise'
                    ? 'bg-[#E5FF00] text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MousePointer className="w-2.5 h-2.5" /> Élément précis
              </button>
              <button
                onClick={() => setSelectionMode('section')}
                className={`px-2 py-0.5 flex items-center gap-1 transition-colors ${
                  selectionMode === 'section'
                    ? 'bg-[#E5FF00] text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Box className="w-2.5 h-2.5" /> Section
              </button>
            </div>
          </div>

          {/* Main Controls scroll area */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1A1A1A]">
            {selectedEl ? (
              <div className="p-3.5 bg-[#111111]/90 space-y-3.5">
                {/* Selected header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block">
                      Élément Sélectionné
                    </span>
                    <span className="font-bold text-[12px] text-[#E5FF00] block truncate max-w-[270px]">
                      {selectedDesc?.elementLabel}
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      Section : {selectedDesc?.sectionLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedEl(null)}
                    className="text-gray-500 hover:text-white text-[10px]"
                  >
                    Désélectionner
                  </button>
                </div>

                {/* DOM Breadcrumbs */}
                {breadcrumbs.length > 1 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block">
                      Hiérarchie (Cliquez pour élargir au parent) :
                    </span>
                    <div className="flex flex-wrap items-center gap-1 text-[9px] bg-[#141414] p-1.5 border border-[#222]">
                      {breadcrumbs.slice(-4).map((crumb, idx, arr) => {
                        const isCurrent = crumb === selectedEl;
                        const label =
                          crumb.getAttribute('data-editor-label') ||
                          crumb.getAttribute('data-editor-id') ||
                          crumb.tagName.toLowerCase();
                        return (
                          <React.Fragment key={idx}>
                            <button
                              onClick={() => setSelectedEl(crumb)}
                              className={`px-1 py-0.5 truncate max-w-[90px] ${
                                isCurrent
                                  ? 'bg-[#E5FF00] text-black font-bold'
                                  : 'text-gray-400 hover:text-white hover:underline'
                              }`}
                            >
                              {label}
                            </button>
                            {idx < arr.length - 1 && (
                              <ChevronRight className="w-2.5 h-2.5 text-gray-600" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 1. DELETE / HIDE BUTTON */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleDeleteElement(selectedEl)}
                    className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 font-bold text-[11px] border transition-colors ${
                      selectedState?.isDeleted
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600 hover:bg-emerald-900'
                        : 'bg-red-950/60 text-red-300 border-red-700/80 hover:bg-red-900/80'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{selectedState?.isDeleted ? 'RÉAFFICHER CET ÉLÉMENT' : 'SUPPRIMER / MASQUER CET ÉLÉMENT'}</span>
                  </button>
                </div>

                {/* 2. SCALE SLIDER & BUTTONS */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span className="font-bold">Agrandir / Rétrécir (Taille)</span>
                    <span className="text-[#E5FF00] font-bold">
                      {Math.round((selectedState?.scale || 1) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.05"
                    value={selectedState?.scale || 1}
                    onChange={(e) => setScale(selectedEl, parseFloat(e.target.value))}
                    className="w-full accent-[#E5FF00] cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setScale(selectedEl, (selectedState?.scale || 1) - 0.1)}
                      className="flex-1 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center gap-1 font-bold text-[10px]"
                    >
                      <ZoomOut className="w-3 h-3" /> -10%
                    </button>
                    <button
                      onClick={() => setScale(selectedEl, 1)}
                      className="px-2 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] text-[10px] text-gray-400 hover:text-white"
                      title="Taille 100% par défaut"
                    >
                      100%
                    </button>
                    <button
                      onClick={() => setScale(selectedEl, (selectedState?.scale || 1) + 0.1)}
                      className="flex-1 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center gap-1 font-bold text-[10px]"
                    >
                      <ZoomIn className="w-3 h-3" /> +10%
                    </button>
                  </div>
                </div>

                {/* 3. TRANSLATION (POSITION X / Y) */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span className="font-bold">Déplacer Position (X / Y)</span>
                    <span className="text-white font-bold">
                      X: {selectedState?.translateX || 0}px | Y: {selectedState?.translateY || 0}px
                    </span>
                  </div>

                  {/* Horizontal Slider X */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-gray-500">
                      <span>Horizontal (X)</span>
                      <span>{selectedState?.translateX || 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="5"
                      value={selectedState?.translateX || 0}
                      onChange={(e) =>
                        setTranslation(selectedEl, parseInt(e.target.value, 10), selectedState?.translateY || 0)
                      }
                      className="w-full accent-[#E5FF00] cursor-pointer"
                    />
                  </div>

                  {/* Vertical Slider Y */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-gray-500">
                      <span>Vertical (Y)</span>
                      <span>{selectedState?.translateY || 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="5"
                      value={selectedState?.translateY || 0}
                      onChange={(e) =>
                        setTranslation(selectedEl, selectedState?.translateX || 0, parseInt(e.target.value, 10))
                      }
                      className="w-full accent-[#E5FF00] cursor-pointer"
                    />
                  </div>

                  {/* Nudge Buttons */}
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    <button
                      onClick={() =>
                        setTranslation(
                          selectedEl,
                          (selectedState?.translateX || 0) - 20,
                          selectedState?.translateY || 0
                        )
                      }
                      className="py-1 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center text-[10px]"
                      title="Gauche -20px"
                    >
                      <ArrowLeft className="w-3 h-3" /> -20px
                    </button>
                    <button
                      onClick={() =>
                        setTranslation(
                          selectedEl,
                          (selectedState?.translateX || 0) + 20,
                          selectedState?.translateY || 0
                        )
                      }
                      className="py-1 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center text-[10px]"
                      title="Droite +20px"
                    >
                      +20px <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        setTranslation(
                          selectedEl,
                          selectedState?.translateX || 0,
                          (selectedState?.translateY || 0) - 20
                        )
                      }
                      className="py-1 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center text-[10px]"
                      title="Monter -20px"
                    >
                      <ArrowUp className="w-3 h-3" /> -20px
                    </button>
                    <button
                      onClick={() =>
                        setTranslation(
                          selectedEl,
                          selectedState?.translateX || 0,
                          (selectedState?.translateY || 0) + 20
                        )
                      }
                      className="py-1 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center text-[10px]"
                      title="Descendre +20px"
                    >
                      +20px <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 4. REORDER (MONTER / DESCENDRE) */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 block font-bold">
                    Ordre dans le flux de page
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => reorderSibling(selectedEl, 'up')}
                      className="flex-1 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center gap-1 font-bold text-[10px]"
                    >
                      <ArrowUp className="w-3 h-3" /> Monter (Avant)
                    </button>
                    <button
                      onClick={() => reorderSibling(selectedEl, 'down')}
                      className="flex-1 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#2B2B2B] flex items-center justify-center gap-1 font-bold text-[10px]"
                    >
                      <ArrowDown className="w-3 h-3" /> Descendre (Après)
                    </button>
                  </div>
                </div>

                {/* 5. LIVE TEXT EDITING */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] text-gray-400 block font-bold flex items-center gap-1">
                    <Type className="w-3 h-3 text-[#E5FF00]" /> Modifier le texte en direct :
                  </label>
                  <textarea
                    value={textValue}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={2}
                    className="w-full bg-[#161616] border border-[#2B2B2B] p-2 text-white text-[11px] font-mono focus:border-[#E5FF00] outline-none"
                    placeholder="Tapez pour modifier le texte..."
                  />
                </div>

                {/* 6. MARGIN TOP (ESPACEMENT) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span className="font-bold">Espacement / Marge Haute</span>
                    <span className="text-white font-bold">{selectedState?.marginTop || 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="150"
                    step="5"
                    value={selectedState?.marginTop || 0}
                    onChange={(e) => setMargin(selectedEl, parseInt(e.target.value, 10))}
                    className="w-full accent-[#E5FF00] cursor-pointer"
                  />
                </div>

                {/* 7. OPACITY */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span className="font-bold">Opacité</span>
                    <span className="text-white font-bold">
                      {Math.round((selectedState?.opacity ?? 1) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 0.75, 0.5, 0.25, 0].map((op) => (
                      <button
                        key={op}
                        onClick={() => setOpacity(selectedEl, op)}
                        className={`flex-1 py-1 text-[9px] border font-bold ${
                          (selectedState?.opacity ?? 1) === op
                            ? 'bg-[#E5FF00] text-black border-[#E5FF00]'
                            : 'bg-[#1C1C1C] border-[#2B2B2B] text-gray-300 hover:text-white'
                        }`}
                      >
                        {Math.round(op * 100)}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset single element */}
                {selectedUid && elementStates.current.has(selectedUid) && (
                  <div className="pt-2">
                    <button
                      onClick={() => resetElement(selectedUid)}
                      className="w-full py-2 bg-[#1C1C1C] hover:bg-[#2B2B2B] border border-[#2B2B2B] text-gray-300 hover:text-white flex items-center justify-center gap-1.5 text-[10px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser cet élément
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 space-y-1 bg-[#0F0F0F]">
                <Layers className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                <p className="text-[11px] text-gray-400 font-medium">Aucun élément sélectionné</p>
                <p className="text-[10px] text-gray-600">
                  Cliquez sur n'importe quel texte, image, bloc ou section sur la page ou choisissez
                  une section ci-dessous.
                </p>
              </div>
            )}

            {/* SECTIONS LIST */}
            <div className="p-3.5 space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">
                Sections du Portfolio ({sections.length})
              </span>
              <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
                {sections.map((sec) => {
                  const uid = getOrAssignUid(sec.element);
                  const isSelected = selectedEl === sec.element;
                  const st = elementStates.current.get(uid);
                  const isHidden = st?.isDeleted;

                  return (
                    <div
                      key={sec.id}
                      onClick={() => {
                        setSelectedEl(sec.element);
                        sec.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`px-2.5 py-1.5 border text-[10px] flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-[#E5FF00] bg-[#E5FF00]/10 text-white'
                          : 'border-[#1E1E1E] bg-[#121212] hover:border-[#333] text-gray-300'
                      }`}
                    >
                      <span className={`truncate mr-2 ${isHidden ? 'line-through text-red-400' : ''}`}>
                        {sec.label}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AUDIT LOG */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">
                  Journal des Retouches ({changes.length})
                </span>
                {changes.length > 0 && (
                  <button
                    onClick={resetAll}
                    className="text-[10px] text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" /> Tout réinitialiser
                  </button>
                )}
              </div>

              {changes.length === 0 ? (
                <p className="text-[10px] text-gray-600 italic py-2">
                  Aucune retouche pour l'instant. Vos actions apparaîtront ici.
                </p>
              ) : (
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {changes.map((chg) => (
                    <div
                      key={chg.id}
                      className="p-2 bg-[#121212] border border-[#202020] text-[10px] space-y-1 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-bold px-1 py-0.5 text-[8px] uppercase tracking-wide ${
                            chg.actionType === 'delete'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : chg.actionType === 'scale'
                              ? 'bg-blue-950 text-blue-400 border border-blue-800'
                              : chg.actionType === 'translate'
                              ? 'bg-purple-950 text-purple-400 border border-purple-800'
                              : chg.actionType === 'text'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {chg.actionType}
                        </span>
                        <button
                          onClick={() => resetElement(chg.elementUid)}
                          className="text-gray-500 hover:text-white p-0.5 opacity-60 group-hover:opacity-100"
                          title="Annuler cette modification"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-bold text-gray-200 truncate">{chg.elementLabel}</div>
                      <div className="text-gray-400 text-[9px]">{chg.description}</div>
                      <div className="text-[8px] text-gray-600">Dans {chg.sectionLabel}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Panel Footer: Export Action */}
          <div className="p-3.5 border-t border-[#222222] bg-[#0E0E0E] space-y-2">
            <button
              onClick={copyToClipboard}
              disabled={changes.length === 0}
              className={`w-full py-3 px-4 font-bold text-[11px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : changes.length > 0
                  ? 'bg-[#E5FF00] text-black hover:bg-[#d8f000] shadow-[0_0_15px_rgba(229,255,0,0.3)]'
                  : 'bg-[#1C1C1C] text-gray-600 cursor-not-allowed'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  COPIÉ DANS LE PRESSE-PAPIER !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  COPIER LES MODIFICATIONS ({changes.length})
                </>
              )}
            </button>
            <p className="text-[9px] text-gray-500 text-center leading-tight">
              Collez ensuite le texte généré dans le chat pour appliquer les changements au code source.
            </p>
          </div>
        </aside>
      )}
    </div>,
    document.body
  );
};

export default VisualEditor;
