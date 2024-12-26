class Question:
    def __init__(self, sess_id, question, a, b, c, d, correct):

        self.sess_id = sess_id
        self.question = question
        self.a = a
        self.b = b
        self.c = c
        self.d = d

        self.count_a = 0
        self.count_b = 0
        self.count_c = 0
        self.count_d = 0

        choices = {a: "a", b: "b", c: "c", d: "d"}
        try:
            self.correct = choices[correct]
        except ValueError:
            self.correct = "a"

    def __str__(self):
        return self.question

    def question_to_json(self):
        return {
            "sess_id": int(self.sess_id),
            "question": self.question,
            "a": self.a,
            "b": self.b,
            "c": self.c,
            "d": self.d,
            "correct": self.correct,
        }

    def choice_to_json(self):
        return {
            "objectID": self.id,
            "a": self.count_a,
            "b": self.count_b,
            "c": self.count_c,
            "d": self.count_d,
        }
