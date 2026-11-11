'use client';

import { useState } from 'react';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Button } from '@/components/common/Button';
import {
  CHALLENGE_CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '@/constants/challenge';
import {
  validateChallenge,
  toDeadlineAt,
} from '@/utils/validators/validateChallenge';
import * as fieldStyles from '@/components/common/TextField.css.js';
import * as styles from './ChallengeForm.css';

const INITIAL_VALUES = {
  title: '',
  sourceUrl: '',
  category: '',
  documentType: '',
  deadline: '',
  maxParticipants: '',
  description: '',
};

export default function ChallengeForm({
  heading = '신규 챌린지 신청',
  submitLabel = '신청하기',
  pendingLabel = '신청 중...',
  initialValues = INITIAL_VALUES,
  onSubmit,
  isPending = false,
  error = null,
  onErrorReset,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const today = new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Seoul',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    if (error) onErrorReset?.();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateChallenge(values);
    setErrors(validationError);
    if (Object.keys(validationError).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      sourceUrl: values.sourceUrl.trim(),
      category: values.category,
      documentType: values.documentType,
      deadlineAt: toDeadlineAt(values.deadline),
      maxParticipants: Number(values.maxParticipants),
      description: values.description.trim(),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>{heading}</h1>

      <Input
        label="제목"
        name="title"
        placeholder="제목을 입력해주세요"
        maxLength={30}
        value={values.title}
        onChange={handleChange}
        error={errors.title}
      />

      <Input
        label="원문 링크"
        name="sourceUrl"
        type="url"
        placeholder="원문 링크를 입력해주세요"
        value={values.sourceUrl}
        onChange={handleChange}
        error={errors.sourceUrl}
      />

      <div className={fieldStyles.field}>
        <label htmlFor="category" className={fieldStyles.label}>
          분야
        </label>
        <select
          id="category"
          name="category"
          required
          className={styles.select}
          value={values.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="" disabled hidden>
            분야를 선택해주세요
          </option>
          {CHALLENGE_CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" className={fieldStyles.errorMessage}>
            {errors.category}
          </p>
        )}
      </div>

      <div className={fieldStyles.field}>
        <label htmlFor="documentType" className={fieldStyles.label}>
          문서 타입
        </label>
        <select
          id="documentType"
          name="documentType"
          required
          className={styles.select}
          value={values.documentType}
          onChange={handleChange}
          aria-invalid={Boolean(errors.documentType)}
          aria-describedby={
            errors.documentType ? 'documentType-error' : undefined
          }
        >
          <option value="" disabled hidden>
            문서 타입을 선택해주세요
          </option>
          {DOCUMENT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.documentType && (
          <p id="documentType-error" className={fieldStyles.errorMessage}>
            {errors.documentType}
          </p>
        )}
      </div>

      <Input
        label="마감일"
        name="deadline"
        type="date"
        value={values.deadline}
        onChange={handleChange}
        error={errors.deadline}
        min={today}
      />

      <Input
        label="최대 인원"
        name="maxParticipants"
        type="number"
        min={1}
        max={15}
        placeholder="인원을 입력해주세요"
        className={styles.maxParticipants}
        value={values.maxParticipants}
        onChange={handleChange}
        error={errors.maxParticipants}
      />

      <Textarea
        label="내용"
        name="description"
        maxLength={255}
        placeholder="내용을 입력해주세요"
        className={styles.description}
        value={values.description}
        onChange={handleChange}
        error={errors.description}
      />

      {error && (
        <p role="alert" className={styles.serverError}>
          {error.message}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth disabled={isPending}>
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
