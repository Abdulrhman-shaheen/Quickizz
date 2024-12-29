class Question:
    def __init__(self, sess_id, question, a, b, c, d, correct):

        self.sess_id = sess_id
        self.question = question
        self.a = a
        self.b = b
        self.c = c
        self.d = d
        self.correct = correct

    def __str__(self):
        return self.question

    def to_dict(self):
        return {
            "sess_id": int(self.sess_id),
            "question": self.question,
            "a": self.a,
            "b": self.b,
            "c": self.c,
            "d": self.d,
            "correct": self.correct,
        }
