FROM node:lts

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm i; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

CMD \
  if [ -f yarn.lock ]; then yarn dev --host; \
  elif [ -f package-lock.json ]; then npm run dev -- --host; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev --host; \
  else yarn dev --host; \
  fi
